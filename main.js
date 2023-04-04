// @ts-nocheck
const ring = document.querySelector(".ring");
const toggleBtn = document.getElementById("btn-toggle");
const settingsBtn = document.getElementById("btn-settings");
const minutesInput = document.getElementById("input-minutes");
const secondsInput = document.getElementById("input-seconds");

// ? Notification Sound
const audio = new Audio("./notification.wav");

let remainingTime;
let intervalId;

// ? Onload Function
window.onload = () => {
	remainingTime = 1500;
	setTime(remainingTime);
};
// ? Start Timer
const startTimer = () => {
	intervalId = countDown();
	console.log(intervalId);
};
//  ? Stop Timer
const stopTimer = () => {
	clearInterval(intervalId);
};

// ? Toggle Timer
const funcToggleTimer = () => {
	if (toggleBtn.textContent === "start") {
		startTimer();
		toggleBtn.innerText = "stop";
	} else if (toggleBtn.textContent === "stop") {
		stopTimer();
		toggleBtn.innerText = "start";
	}
};

// ? Button Event for Start/Stop
toggleBtn.onclick = () => {
	funcToggleTimer();
};

// ? Checks time on display
const setTime = (time) => {
	/*
	* This function checks the remaining time and sets it to display:
				? If minutes === 0; Updates minutesInput with 0, otherwise updates with the minutes remaining;
				? If seconds < 10; Updates SecondsInput with O before the seconds value, otherwise updates with the seconds remaining;
	*/

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	minutesInput.setAttribute("value", minutes === 0 ? "00" : minutes);
	secondsInput.setAttribute("value", seconds < 10 ? `0${seconds}` : seconds);
};

// ? Countdown Function
const countDown = () => {
	// * This function returns the intervalId

	return setInterval(() => {
		/*
		* On Every recurring event reduces remaining time by 1;
	    * When remainingTime < 0:
				? Changes Ring Color;
				? Stops Timer;
				? Plays notification Sound;
				? Initiates alert browser event;
		*/

		remainingTime--;
		setTime(remainingTime);
		if (remainingTime <= 0) {
			audio.play();
			clearInterval(intervalId);
			ring.classList.add("ending");
			stopTimer();
		}
	}, 1000);
};

// ? Button event to Increase Time
settingsBtn.onclick = () => {
	/*
	 * On every event retrieves the current timer value;
	 * Increases the remaining Time by 300;
	 */

	let currentTimerValue =
		parseInt(minutesInput.getAttribute("value")) * 60 +
		parseInt(secondsInput.getAttribute("value"));

	remainingTime = currentTimerValue + 300;
	setTime(remainingTime);
};
