#include "delay.h"
//////////////////////////////////////////////////////////////////////////////////	 
//////////////////////////////////////////////////////////////////////////////////
static u8  fac_us=0;//us��ʱ������
static u16 fac_ms=0;//ms��ʱ������
__IO float usDelayBase;

void delay_us(u32 nus)
{
  __IO uint32_t delayReg;

  __IO uint32_t msNum = nus/1000;
  __IO uint32_t usNum = (uint32_t)((nus%1000)*usDelayBase);

  if(msNum>0) HAL_Delay(msNum);

  delayReg = 0;
  while(delayReg!=usNum) delayReg++;
}

//��ʼ���ӳٺ���
//SYSTICK��ʱ�ӹ̶�ΪHCLKʱ�ӵ�1/8
//SYSCLK:ϵͳʱ��
void delay_init(u8 SYSCLK)
{
//	SysTick->CTRL&=0xfffffffb;//bit2���,ѡ���ⲿʱ��  HCLK/8
	//SysTick_CLKSourceConfig(SysTick_CLKSource_HCLK_Div8);	//ѡ���ⲿʱ��  HCLK/8
	fac_us=SYSCLK/8;		    
	fac_ms=(u16)fac_us*1000;
}								    
//��ʱnms
//ע��nms�ķ�Χ
//SysTick->LOADΪ24λ�Ĵ���,����,�����ʱΪ:
//nms<=0xffffff*8*1000/SYSCLK
//SYSCLK��λΪHz,nms��λΪms
//��72M������,nms<=1864 
void delay_ms(u16 nms)
{	 		  	  
	HAL_Delay(nms); 	    
}   
//��ʱnus
//nusΪҪ��ʱ��us��.		    								   





































