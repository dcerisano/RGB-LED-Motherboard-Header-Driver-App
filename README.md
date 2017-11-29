![](http://standard3d.com/assets/img/jled4.jpg)<br>
<b>Goals: RGB ALL The Things!</b>

- <b>ALL the effects:</b> <i>RGB Sync App for creating synchronized effects (CPU, audio/video, network ..)</i>
- <b>ALL the platforms:</b> <i>Cross distro (OSX, Linux, Windows ..)</i>
- <b>ALL the motherboards:</b> <i>Cross mobo (Asus, ASRock, MSI ..)</i>
<br>

<b>The following synchronized RGB effects are available:</b>

- <i>Currently only for distros and mobos supported by</i> [github.com/nagisa/msi-rgb](https://github.com/nagisa/msi-rgb)<br>
- <i>Assumes understanding of underlying technologies (see LICENSE).</i><br>
<br>



<b>RGB CPU Thruster</b> <i>(Linux/MSI)</i><br>
![](http://standard3d.com/assets/img/rgb-cpu-thruster.gif)<br><br>

<b>RGB Sound Visualizer</b> <i>(Linux/MSI)</i><br>
![](http://standard3d.com/assets/img/rgb-sound1.gif)<br><br>

<b>RGB Sync App Design</b> <i>(CPU Thruster shown)</i><br>
![](http://standard3d.com/assets/img/rgb-gui-placeholder4.gif)<br><br>


<b>INSTRUCTIONS</b>

- Read the install.sh, rg-cpu.sh, rgb-sound.sh and rgb-net.sh scripts
- sudo ./install.sh

<b>FAQ</b><br><br>
<i>Q: Why does this not work on my OS/motherboard?</i><br>
A: Try running your Windows 10 RGB software once after a power up - this can activate RGB headers.<br>
A: Contribute to [github.com/nagisa/msi-rgb](https://github.com/nagisa/msi-rgb) to cover more distro/mobo combos.<br><br>
<i>Q: Do these effects have any system overhead?</i><br>
A: Yes - around 1% of a single CPU thread at medium sampling.<br><br>
<i>Q: Can I run ALL the effects at the same time?</i><br>
A: Yes - but that will increase CPU usage accordingly.<br><br>
<i>Q: Can I create my own effects?</i><br>
A: Yes - hack away at the scripts. Hacking the RGB driver is not recommended for beginners.<br><br>
<i>Q: Might the RGB Sync App be available soon?</i><br>
A: Yes - it certainly might be.
