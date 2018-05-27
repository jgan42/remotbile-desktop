const firebase = require('././firebase');
const robot = require('robotjs');

let range = null;
let screenSize = robot.getScreenSize();
let height = screenSize.height;
let width = screenSize.width;
let lastClick = '';

console.log('desktop start');

const onOrientationChange = (data) => {
    if (!range) {
        return;
    }
    const phoneX = range.left - range.right;
    const phoneY = range.top - range.bottom;
    const x = width - ((data.alpha - range.right) / phoneX * width);
    const y = height - ((data.beta - range.bottom) / phoneY * height);

    robot.moveMouse(x, y);
};

const onRangeChange = (data) => {
    range = data;
};

const onClickChange = (leftOrRight) => {
    let upOrDown = 'down';
    if (leftOrRight) {
        lastClick = leftOrRight;
    } else {
        leftOrRight = lastClick;
        lastClick = '';
        upOrDown = 'up';
    }
    if (lastClick || leftOrRight) {
        robot.mouseToggle(upOrDown, leftOrRight);
    }
};

firebase.watchOrientation(onOrientationChange);
firebase.watchRange(onRangeChange);
firebase.watchClick(onClickChange);
