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
    # and initial level to High(3.3v)
    GPIO.setup(BuzzerPin, GPIO.OUT, initial=GPIO.HIGH)

def alert():
	GPIO.output(BuzzerPin, GPIO.LOW)
	GPIO.output(LEDPIN,GPIO.HIGH)
	time.sleep(0.0002)
	GPIO.output(BuzzerPin, GPIO.HIGH)
	GPIO.output(LEDPIN,GPIO.LOW)
	time.sleep(0.0003)
	GPIO.output(BuzzerPin, GPIO.LOW)
	GPIO.output(LEDPIN,GPIO.HIGH)
	time.sleep(0.0004)
	GPIO.output(BuzzerPin, GPIO.HIGH)
	GPIO.output(LEDPIN,GPIO.LOW)
	time.sleep(0.0003)
	GPIO.output(BuzzerPin, GPIO.LOW)
	GPIO.output(LEDPIN,GPIO.HIGH)
	time.sleep(0.0002)
	GPIO.output(BuzzerPin, GPIO.HIGH)
	GPIO.output(LEDPIN,GPIO.LOW)
	time.sleep(0.0003)
	GPIO.output(BuzzerPin, GPIO.LOW)
	GPIO.output(LEDPIN,GPIO.HIGH)
	time.sleep(0.0004)
	GPIO.output(BuzzerPin, GPIO.HIGH)
	GPIO.output(LEDPIN,GPIO.LOW)
	time.sleep(0.0003)

def destroy():
	# Turn off buzzer
	GPIO.output(BuzzerPin, GPIO.HIGH)
	GPIO.output(LEDPIN,GPIO.LOW)
	# Release resource
	GPIO.cleanup()
	
def sendAlert():
	setup()
	alert()
	destroy()
	return { 'result' : 1 }
	
