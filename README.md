<b>Goals: RGB all things!</b>

- <b><i>All the effects:</i></b> RGB Sync App for creating effects (CPU, audio/video, network ..)
- <b><i>All the platforms:</i></b> Cross distro (OSX, Linux, Windows ..)
- <b><i>All the motherboards:</i></b> Cross mobo (Asus, ASRock, MSI ..)
<br>

<b>Synchronized RGB effects.</b>

- <i>Currently only for distros and mobos supported by</i> [github.com/nagisa/msi-rgb](https://github.com/nagisa/msi-rgb)<br>
- <i>Requires good understanding of shell scripting.</i><br>
<br>



<b>RGB CPU Thruster</b> <i>Linux/MSI</i><br>
![](http://standard3d.com/assets/img/rgb-cpu-thruster.gif)<br><br>

<b>RGB Sound Visualizer</b> <i>Linux/MSI</i><br>
![](http://standard3d.com/assets/img/rgb-sound.gif)<br><br>

<b>RGB Sync App Design</b> (CPU Thruster shown)<br>
![](http://standard3d.com/assets/img/rgb-gui-placeholder4.gif)<br><br>


<b>INSTRUCTIONS</b>

- Build RGB driver<br>
  `sudo apt install rustc cargo`<br>
  `cargo build --release`<br>
  
- Run the effects as outlined in these scripts (follow the instructions):<br>
  `rgb-cpu-thruster.sh`<br>
  `rgb-sound-visualizer.sh`<br><br>

<b>FAQ</b><br><br>
Q: Why does this not work on my OS/motherboard?<br>
A: Contribute to [github.com/nagisa/msi-rgb](https://github.com/nagisa/msi-rgb) to cover more distro/mobo combos.<br><br>
Q: Do these effects have any system overhead?<br>
A: Very little - around 1% of a single CPU thread.<br><br>
Q: Can I run ALL the effects at the same time?<br>
A: Yes, but that will increase CPU usage accordingly.<br><br>
Q: Can I create my own effects?<br>
A: Yes - hack away at the scripts. Hacking the RGB driver is not recommended for beginners.<br><br>
Q: Might the RGB Sync App be available soon?<br>
A: Yes, it certainly might be.
