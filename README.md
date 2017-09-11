Cross-platform, cross-motherboard synchronized RGB effects.<br>
<i>- Currently only for distros and mobos supported by</i> [github.com/nagisa/msi-rgb](https://github.com/nagisa/msi-rgb)<br>
<i>- Requires good understanding of shell scripting.</i><br>
<br>
<b>GOAL - RGB ALL THE THINGS!</b>

- <b><i>ALL THE EFFECTS</i></b> RGB Sync App for creating effects (CPU, audio/video, network ..)
- <b><i>ALL THE PLATFORMS</i></b> Cross distro (OSX, Linux, Windows ..)
- <b><i>ALL THE MOTHERBOARDS</i></b> Cross mobo (Asus, ASRock, MSI ..)
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
  `rgb-sound-visualizer.sh`
  
<b>FAQ</b><br><br>
Q: Why does this not work on my OS/motherboard?<br>
A: The RGB driver is being expanded to cover more distro/mobo combos.<br><br>
Q: Do these effects have any system overhead?<br>
A: Very little - around 1% of a single CPU thread.<br><br>
Q: Can I run ALL the effects at the same time?<br>
A: Yes, but that will increase CPU usage accordingly.<br><br>
Q: Can I create my own effects?<br>
A: Yes - hack away at the scripts. Hacking the RGB driver is not recommended for beginners.<br><br>
Q: Will the RGB Sync App be available soon?<br>
A: Yes
