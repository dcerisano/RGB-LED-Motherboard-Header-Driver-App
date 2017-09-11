Cross-platform, cross-motherboard synchronized RGB effects.<br>
<i>Currently only for distros and mobos supported by</i> [github.com/nagisa/msi-rgb](https://github.com/nagisa/msi-rgb)

<b>GOALS</b>

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


<b>INTRSUCTIONS</b>

- Build RGB driver<br>
  `sudo apt install rustc cargo`<br>
  `cargo build --release`<br>
  
- Run the effects as outlined in these scripts:<br>
  `rgb-cpu-thruster.sh`<br>
  `rgb-sound-visualizer.sh`
