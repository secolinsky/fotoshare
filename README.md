# Introduction
I have a samba server with photos I've amassed over the few years since my daughter was born.  I'd like to have a custom app to show all pictures on a nice
dispaly in the house.  Because I don't use Facebook, or any other service to store my photos, I need to find a solution that uses my samba NAS server to
enjoy and watch the photos of my daughter's growth and development over the years.
# Hardware
I'm building this web app to be able to take the photos from my local area network Samba NAS server on my raspberry that uses the WDLabs hard drive to
show at my home on a Smarti Touch.  Below is the list of hardware I'm using to create my app.
- Raspberry Pi 3
- WDLabs 250 GB PiDrive
- Smarti Touch 7" Touchscreen

A diagram on how all that hardware will play with software is illustrated below.  I've put the time to illustrate my strategy before I write any code.
![app diagram and schema](diagram.png)
# TODO
- define the object schema for mongoDB
  I intend to write the seed database file using mongoose