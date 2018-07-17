# 
# To create a buzzing sounds using a passive piezo buzzer and DC current,
# a square wave must be sent to the piezo. This can be accomplished by 
# rapidly sending high and low pulses to the piezo buzzer. 
# 

import RPi.GPIO as GPIO
import time
  
#LED connected to BCM_GPIO
LEDPIN = 17

#Buzzer connected to BCM_GPIO23 
BuzzerPin = 23

def setup():
    # Set the GPIO modes to BCM Numbering
    GPIO.setmode(GPIO.BCM)
	#set LEDPIN's mode to output,and initial level to LOW(0V)
    GPIO.setup(LEDPIN,GPIO.OUT,initial=GPIO.LOW)	
    # Set BuzzerPin's mode to output, 
    # and initial level to High(5.0v)
    GPIO.setup(BuzzerPin, GPIO.OUT, initial=GPIO.HIGH)

def alert(repeat):
	#loop through and beep, {repeat} times
	for i in range(0, repeat):
		#turn LED on
		GPIO.output(LEDPIN,GPIO.HIGH)
		#square wave loop
		for pulse in range(60):
			#set buzzer low
			GPIO.output(BuzzerPin, GPIO.LOW)
			time.sleep(0.0009)
			#set buzzer high
			GPIO.output(BuzzerPin, GPIO.HIGH)
			time.sleep(0.0009)
		#turn LED off
		GPIO.output(LEDPIN,GPIO.LOW)
		#rest between beeps
		time.sleep(0.3)
		

def destroy():
	# Turn off buzzer
	GPIO.output(BuzzerPin, GPIO.LOW)
	GPIO.output(LEDPIN,GPIO.LOW)
	# Release resource
	GPIO.cleanup()
	
def sendAlert():
	setup()
	alert(6)
	destroy()
	return { 'result' : 1 }
	
