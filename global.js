window.onload = function () {

    // 是否生成新的数字
    var isNewNum = false;

    var currScore = 0; // 本局游戏得分
    var maxScore = 0; // 历史最高得分

    // 利用本地缓存来记录历史分数
    if (localStorage.maxScore) {
        maxScore = localStorage.maxScore - 0; //localStorage.maxScore为字符串类型
    } else {
        maxScore = 0;
    }


    var GAME = {

        /*
         ** 游戏初始化
         */
        init: function () {

            // 初始化得分
            $('#currScore').html(currScore);
            $('#maxScore').html(maxScore);

            // 再来一次游戏刷新
            $('.refreshBtn').click(this.playAgain);

            // 随机生成两个数字，2或者4
            this.newRandomNum();
            this.newRandomNum();

            // 刷新盒子的背景色
            this.refreshColor();

        },

        /* 
         ** 再来一次游戏刷新
         */
        playAgain: function () {

            var boxes = $('.boxes .row .box');
            for (var i = 0; i < boxes.length; i++) {
                boxes.eq(i).html('').removeClass('nonEmptyBox').addClass('emptyBox');
            }

            // 本局游戏分数清零
            currScore = 0;
            $('#currScore').html(currScore);

            // 随机生成两个数字，2或者4
            GAME.newRandomNum();
            GAME.newRandomNum();

            // 刷新盒子的背景色
            GAME.refreshColor();
        },

        /*
         ** 随机生成一个新数字
         */
        newRandomNum: function () {
            var randomNumArr = [2, 2, 4];
            var randomNum = randomNumArr[getRandom(0, 2)];

            // 随机生成新数字的盒子
            var emptyBoxes = $('.boxes .row .emptyBox');
            var newNumBox = getRandom(0, emptyBoxes.length - 1);
            emptyBoxes.eq(newNumBox).html(randomNum).removeClass('emptyBox').addClass('nonEmptyBox');
        },

        /*
         ** 刷新盒子的背景色
         */
        refreshColor: function () {
            var boxes = $('.boxes .row .box');
            for (var i = 0; i < boxes.length; i++) {
                switch (boxes.eq(i).html()) {
                    case '':
                        boxes.eq(i).css('background', '');
                        break;
                    case '2':
                        boxes.eq(i).css('background', '#FAEBD7');
                        break;
                    case '4':
                        boxes.eq(i).css('background', '#FFDEAD');
                        break;
                    case '8':
                        boxes.eq(i).css('background', '#FFC125');
                        break;
                    case '16':
                        boxes.eq(i).css('background', '#FF8C00');
                        break;
                    case '32':
                        boxes.eq(i).css('background', '#FFC0CB');
                        break;
                    case '64':
                        boxes.eq(i).css('background', '#FF6A6A');
                        break;
                    case '128':
                        boxes.eq(i).css('background', '#FF0000');
                        break;
                    case '256':
                        boxes.eq(i).css('background', '#FFFACD');
                        break;
                    case '512':
                        boxes.eq(i).css('background', 'FFF68F');
                        break;
                    case '1024':
                        boxes.eq(i).css('background', '#FFB90F');
                        break;
                    case '2048':
                        boxes.eq(i).css('background', '#F4A460');
                        break;
                    case '4096':
                        boxes.eq(i).css('background', '#FFFF00');
                        break;
                }
            }
        },

        /*
         ** 获取到当前盒子旁边的盒子
         */
        getSideBox: function (currBox, direction) {

            //  当前盒子的位置
            var currBoxX = currBox.attr('data-x') - 0;
            var currBoxY = currBox.attr('data-y') - 0;

            // 根据移动方向确定当前盒子旁边的盒子
            switch (direction) {
                case 'up':
                    var sideBoxX = currBoxX - 1;
                    var sideBoxY = currBoxY;
                    break;
                case 'down':
                    var sideBoxX = currBoxX + 1;
                    var sideBoxY = currBoxY;
                    break;
                case 'left':
                    var sideBoxX = currBoxX;
                    var sideBoxY = currBoxY - 1;
                    break;
                case 'right':
                    var sideBoxX = currBoxX;
                    var sideBoxY = currBoxY + 1;
                    break;
            }

            // 旁边的盒子
            var sideBox = $('.boxes .row .x' + sideBoxX + 'y' + sideBoxY);
            return sideBox;
        },

        /* 
         ** 移动当前盒子
         */
        boxMove: function (currBox, direction) {

            //  获取到当前盒子旁边的盒子
            var sideBox = GAME.getSideBox(currBox, direction);
            if (sideBox.length === 0) { //当前盒子在最边边上且往边上那个方向移动时，即当前盒子在移动方向上旁边没有盒子

                // 当前盒子不动

            } else if (sideBox.html() === '') { //当前盒子不在最边边上，且四周(四个移动方向上)都是空盒子时
                sideBox.html(currBox.html()).removeClass('emptyBox').addClass('nonEmptyBox');
                currBox.html('').removeClass('nonEmptyBox').addClass('emptyBox');
                GAME.boxMove(sideBox, direction);
                isNewNum = true; //生成一个新的数字
            } else if (sideBox.html() !== currBox.html()) { //当前盒子的数字和移动方向上旁边的盒子数字不同

                // 当前盒子不动

            } else { //当前盒子和移动方向上旁边的盒子数字相同

                // 合并
                sideBox.html((sideBox.html() - 0) * 2);
                currBox.html('').removeClass('nonEmptyBox').addClass('emptyBox');
                currScore += (sideBox.html() - 0) * 10; //更新本局得分
                $('#currScore').html(currScore);

                // 比较本局当前得分和历史最高分，更新历史最高分
                maxScore = currScore > maxScore ? currScore : maxScore;
                $('#maxScore').html(maxScore);
                localStorage.maxScore = maxScore;
                isNewNum = true; //合并完产生一个新的数字
                return;

            }
        },

        /*
         ** 整体移动
         */
        move: function (direction) {
            var that = this;

            // 获取所有非空盒子
            var nonEmptyBoxes = $('.boxes .row .nonEmptyBox');

            // 按键方向向左或向上时，正向遍历非空盒子，将非空的盒子依次朝按键方向移动，即先移动按键方向上最底层的盒子
            if (direction === 'left' || direction === 'up') {
                for (var i = 0; i < nonEmptyBoxes.length; i++) {
                    var currBox = nonEmptyBoxes.eq(i);
                    that.boxMove(currBox, direction);
                }
            } else if (direction === 'right' || direction === 'down') { //按键方向向右或向下时，正向遍历非空盒子
                for (var i = nonEmptyBoxes.length - 1; i >= 0; i--) {
                    var currBox = nonEmptyBoxes.eq(i);
                    that.boxMove(currBox, direction);
                }
            }

            // 判断是否产生新的数字
            if (isNewNum) {
                this.newRandomNum();
                this.refreshColor();
            }
        },

        /*
         ** 判断游戏是否结束
         */
        isGameOver: function () {

            // 获取所有盒子
            var boxes = $('.boxes .row .box');

            // 获取所有非空盒子
            var nonEmptyBoxes = $('.boxes .row .nonEmptyBox');
            if (boxes.length === nonEmptyBoxes.length) { //没有空盒子

                // 遍历所有非空盒子
                for (var i = 0; i < nonEmptyBoxes.length; i++) {
                    var currBox = nonEmptyBoxes.eq(i);
                    if (GAME.getSideBox(currBox, 'up') !== 0 && currBox.html() === GAME.getSideBox(currBox, 'up').html()) {

                        // 即当前盒子上方的盒子存在，且二者的数字相同
                        return;
                    } else if (GAME.getSideBox(currBox, 'down') !== 0 && currBox.html() === GAME.getSideBox(currBox, 'down').html()) {

                        // 即当前盒子下方的盒子存在，且二者的数字相同
                        return;
                    } else if (GAME.getSideBox(currBox, 'left') !== 0 && currBox.html() === GAME.getSideBox(currBox, 'left').html()) {

                        // 即当前盒子左侧的盒子存在，且二者的数字相同
                        return;
                    } else if (GAME.getSideBox(currBox, 'right') !== 0 && currBox.html() === GAME.getSideBox(currBox, 'right').html()) {

                        // 即当前盒子右侧的盒子存在，且二者的数字相同
                        return;
                    }
                }
            } else {
                return;
            }
            window.alert("游戏结束！！！");
        }

    };


    // 产生 min到max之间的随机整数
    function getRandom(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }


    // 游戏初始化
    GAME.init();

    // 监听再来一次按钮的点击事件
    $('.refreshBtn').click(GAME.playAgain);

    // 监听键盘的方向键触发盒子移动
    $('body').keydown(function (event) {
        switch (event.keyCode) {
            case 37:
                // left
                isNewNum = false;
                GAME.move('left');
                GAME.isGameOver();
                break;
            case 38:
                // up
                isNewNum = false;
                GAME.move('up');
                GAME.isGameOver();
                break;
            case 39:
                // right
                isNewNum = false;
                GAME.move('right');
                GAME.isGameOver();
                break;
            case 40:
                // down
                isNewNum = false;
                GAME.move('down');
                GAME.isGameOver();
                break;
        }
    });

    // 移动端手指触摸滑动触发盒子移动
    (function () {
        var boxesArea = document.getElementsByClassName('boxes')[0];
        mobileTouch(boxesArea);
        boxesArea.addEventListener('right', function (e) {
            e.preventDefault();
            isNewNum = false;
            GAME.move('right');
            GAME.isGameOver();
        });
        boxesArea.addEventListener('left', function (e) {
            e.preventDefault();
            isNewNum = false;
            GAME.move('left');
            GAME.isGameOver();
        });
        boxesArea.addEventListener('up', function (e) {
            e.preventDefault();
            isNewNum = false;
            GAME.move('up');
            GAME.isGameOver();
        });
        boxesArea.addEventListener('down', function (e) {
            e.preventDefault();
            isNewNum = false;
            GAME.move('down');
            GAME.isGameOver();
        });


        // 根据触摸开始和结束的位置，判断滑动方向，进而确定盒子的移动方向
        function mobileTouch(obj) {
            var startX, startY, endX, endY, distX, distY;

            // 监听触摸开始的位置
            obj.addEventListener('touchstart', function (e) {
                startX = e.targetTouches[0].clientX;
                startY = e.targetTouches[0].clientY;
            }, false);

            // 监听触摸结束的位置
            obj.addEventListener('touchend', function (e) {
                endX = e.changedTouches[0].clientX;
                endY = e.changedTouches[0].clientY;

                distX = endX - startX;
                distY = endY - startY;

                var difference = Math.abs(distX) - Math.abs(distY); //根据difference判断滑动是在水平方向还是垂直方向上

                if (distY < 0 && difference < 0) {
                    obj.dispatchEvent(eventCustom('up'));
                } else if (distY > 0 && difference < 0) {
                    obj.dispatchEvent(eventCustom('down'));
                } else if (distX > 0 && difference > 0) {
                    obj.dispatchEvent(eventCustom('right'));
                } else if (distX < 0 && difference > 0) {
                    obj.dispatchEvent(eventCustom('left'));
                }
            }, false);


            // 处理自定义事件
            function eventCustom(eName) {
                if (typeof document.CustomEvent === 'function') {

                    this.event = new document.CustomEvent(eName, { //定义自定义事件
                        bubbles: false,
                        cancelable: false
                    });
                    if (!document["eventself" + eName]) {
                        document["eventself" + eName] = this.event;
                    }
                } else if (typeof document.createEvent === 'function') {

                    this.event = document.createEvent('HTMLEvents');
                    this.event.initEvent(eName, false, false);
                    if (!document["eventself" + eName]) {
                        document["eventself" + eName] = this.event;
                    }
                } else {
                    return false;
                }
                return document["eventself" + eName];
            }
        }

    })();

    // safari页面缩放问题
    // 禁用双指缩放
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, {
        capture: true,
        passive: false
    });

    // 禁用手指双击缩放
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
};