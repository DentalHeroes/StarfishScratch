#!/usr/bin/env python
import RPi.GPIO as GPIO
import time

BeepPin = 11

def setup():
	GPIO.setmode(GPIO.BOARD)
        GPIO.setup(BeepPin, GPIO.OUT)
        GPIO.output(BeepPin, GPIO.HIGH)

def beep(repeat):
	for i in range(0, repeat):
		for pulse in range(60):
			GPIO.output(BeepPin, GPIO.LOW)
			time.sleep(0.0005)
			GPIO.output(BeepPin, GPIO.HIGH)
			time.sleep(0.0005)
		time.sleep(0.02)

def loop():
	while True:
                GPIO.output(BeepPin, GPIO.LOW)
		time.sleep(0.0125)
		GPIO.output(BeepPin, GPIO.HIGH)
		time.sleep(0.0125)
                time.sleep(0.02)

def destroy():
	GPIO.output(BeepPin, GPIO.HIGH)
	GPIO.cleanup()

if __name__ == '__main__':
	print 'Press Ctrl+C to end the program...'
	setup()
	try:
#		loop()
		beep(16)
	except KeyboardInterrupt:
		destroy()

