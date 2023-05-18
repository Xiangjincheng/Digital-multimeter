#ifndef OLED_H
#define OLED_H

#include <stdint.h>
#include "main.h"

extern I2C_HandleTypeDef hi2c2;
extern unsigned char bmp1[];

void oled_full(uint8_t data); 
void oled_init(void); 
void oled_show_char(uint8_t x,uint8_t y,uint8_t chr,uint8_t Char_Size);
void oled_show_string(uint8_t x, uint8_t y, char ch[], uint8_t TextSize); 
void oled_show_chinese(uint8_t x,uint8_t y,uint8_t no); 
void oled_show_bmp(uint8_t x0, uint8_t y0, uint8_t x1, uint8_t y1, uint8_t bmp[]);
void oled_clear(void); 

#endif







