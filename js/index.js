let inputDir = { x: 0, y: 0 };
        const foodsound = new Audio('food.mp3');
        const gameoversound = new Audio('gameover.mp3');
        const movesound = new Audio('move.mp3');
        const musicsound = new Audio('music.mp3');
        let speed = 2;
        let score = 0;
        let lastPaintTime = 0;
        let snakeArr = [{ x: 13, y: 15 }];
        let food = { x: 6, y: 7 };

        function main(ctime) {
            window.requestAnimationFrame(main);
            if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
                return;
            }
            lastPaintTime = ctime;
            gameEngine();
        }

        function isCollide(snake) {
            for (let i = 1; i < snakeArr.length; i++) {
                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                    return true;
                }
            }
            if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
                return true;
            }
        }

        function gameEngine() {
            if (isCollide(snakeArr)) {
                gameoversound.play();
                musicsound.pause();
                inputDir = { x: 0, y: 0 };
                alert("Game Over! Press any key to play again.");

                snakeArr = [{ x: 13, y: 15 }];
                musicsound.play();
                score = 0;
            }

            if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
                foodsound.play();
                snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
                let a = 2;
                let b = 16;
                food = {
                    x: Math.round(a + (b - a) * Math.random()),
                    y: Math.round(a + (b - a) * Math.random())
                };
                score += 1;
                speed += 0.5;
            }

            for (let i = snakeArr.length - 2; i >= 0; i--) {
                snakeArr[i + 1] = { ...snakeArr[i] };
            }
            snakeArr[0].x += inputDir.x;
            snakeArr[0].y += inputDir.y;

            const board = document.getElementById('board');
            board.innerHTML = '';

            snakeArr.forEach((e, index) => {
                const snakeElement = document.createElement('div');
                snakeElement.style.gridRowStart = e.y;
                snakeElement.style.gridColumnStart = e.x;

                if (index === 0) {
                    snakeElement.classList.add('head');
                } else {
                    snakeElement.classList.add('snake');
                }

                board.appendChild(snakeElement);
            });

            const foodElement = document.createElement('div');
            foodElement.style.gridRowStart = food.y;
            foodElement.style.gridColumnStart = food.x;
            foodElement.classList.add('food');
            board.appendChild(foodElement);
        }

        window.requestAnimationFrame(main);

        window.addEventListener('keydown', e => {
            inputDir = { x: 0, y: 1 }; // Resetting inputDir to default down direction
            movesound.play();

            switch (e.key) {
                case 'ArrowUp':
                    inputDir.x = 0;
                    inputDir.y = -1;
                    break;
                case 'ArrowDown':
                    inputDir.x = 0;
                    inputDir.y = 1;
                    break;
                case 'ArrowLeft':
                    inputDir.x = -1;
                    inputDir.y = 0;
                    break;
                case 'ArrowRight':
                    inputDir.x = 1;
                    inputDir.y = 0;
                    break;
                default:
                    break;
            }
        });