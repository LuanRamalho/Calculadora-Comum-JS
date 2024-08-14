        function getDisplay() {
            return document.getElementById('display');
        }

        function setDisplay(value) {
            let formattedValue = Number(value).toFixed(12); // Keep up to 12 decimal places
            formattedValue = formattedValue.replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1'); // Remove trailing zeros
            getDisplay().value = formattedValue.toLocaleString('en-US');
        }

        function clearDisplay() {
            document.getElementById('display').value = '';
        }

        function deleteLast() {
            let display = getDisplay();
            display.value = display.value.slice(0, -1);
            addThousandSeparator();
        }

        function appendToDisplay(value) {
            let display = getDisplay();
            display.value += value;
            addThousandSeparator();
        }

        function formatDisplay() {
            let display = getDisplay();
            let parts = display.value.split(/(\D)/); // Split by non-digit characters
            for (let i = 0; i < parts.length; i++) {
                if (!isNaN(parts[i]) && parts[i] !== '') {
                    parts[i] = Number(parts[i]).toFixed(12).replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1'); // Remove trailing zeros
                }
            }
            display.value = parts.join('');
            addThousandSeparator();
        }

        function removeSeparators(value) {
            return value.replace(/,/g, '');
        }

        function calculate() {
            let display = getDisplay();
            try {
                let result = eval(removeSeparators(display.value).replace('^', '**').replace('%', '/100'));
                setDisplay(result);
            } catch (e) {
                display.value = 'Erro';
            }
        }

        function calculateSqrt() {
            let display = getDisplay();
            try {
                let result = Math.sqrt(eval(removeSeparators(display.value)));
                setDisplay(result);
            } catch (e) {
                display.value = 'Erro';
            }
        }

        function calculateFactorial() {
            let display = getDisplay();
            let num = eval(removeSeparators(display.value));
            if (num < 0 || num % 1 !== 0) { // Ensure the number is non-negative integer
                display.value = 'Erro';
                return;
            }
            let factorial = 1;
            for (let i = num; i > 1; i--) {
                factorial *= i;
            }
            setDisplay(factorial);
        }

        function calculateTrig(func) {
            let display = getDisplay();
            let value = eval(removeSeparators(display.value));
            let result;
            switch (func) {
                case 'sin':
                    result = Math.sin(value * Math.PI / 180);
                    break;
                case 'cos':
                    result = Math.cos(value * Math.PI / 180);
                    break;
                case 'tan':
                    result = Math.tan(value * Math.PI / 180);
                    break;
            }
            setDisplay(result);
        }

        function addThousandSeparator() {
            let display = getDisplay();
            let value = display.value.replace(/,/g, '');
            let parts = value.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            display.value = parts.join('.');
        }

