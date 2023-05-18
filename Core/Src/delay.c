#include "delay.h"
//////////////////////////////////////////////////////////////////////////////////	 
//////////////////////////////////////////////////////////////////////////////////
static u8  fac_us=0;//us延时倍乘数
static u16 fac_ms=0;//ms延时倍乘数
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

//初始化延迟函数
//SYSTICK的时钟固定为HCLK时钟的1/8
//SYSCLK:系统时钟
void delay_init(u8 SYSCLK)
{
//	SysTick->CTRL&=0xfffffffb;//bit2清空,选择外部时钟  HCLK/8
	//SysTick_CLKSourceConfig(SysTick_CLKSource_HCLK_Div8);	//选择外部时钟  HCLK/8
	fac_us=SYSCLK/8;		    
	fac_ms=(u16)fac_us*1000;
}								    
//延时nms
//注意nms的范围
//SysTick->LOAD为24位寄存器,所以,最大延时为:
//nms<=0xffffff*8*1000/SYSCLK
//SYSCLK单位为Hz,nms单位为ms
//对72M条件下,nms<=1864 
void delay_ms(u16 nms)
{	 		  	  
	HAL_Delay(nms); 	    
}   
//延时nus
//nus为要延时的us数.		    								   





































