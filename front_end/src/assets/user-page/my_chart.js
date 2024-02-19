const ctx = document.getElementById('myChart').getContext('2d');
const earning = document.getElementById('earning').getContext('2d');
const customers = document.getElementById('customers').getContext('2d');
const numberCustomers = document.getElementById('numberCustomers').getContext('2d');
const blog = document.getElementById('blog').getContext('2d');

// biểu đồ 1
const myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: ['One Piece', 'Dragon Ball', 'Phụ kiện', 'CS:GO', 'Naruto', 'Khác'],
        datasets: [{
            label: '# of Votes',
            data: [20, 19, 6, 10, 15, 7],
            backgroundColor: [
                'rgba(235, 47, 6, 0.4)',
                'rgba(255, 242, 0, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(197, 108, 240, 0.4)',
                'rgba(120, 224, 143, 0.4)',
                'rgba(74, 105, 189, 0.4)'
            ],
            borderColor: [
                'rgba(235, 47, 6, 1)',
                'rgba(255, 242, 0, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(197, 108, 240, 1)',
                'rgba(120, 224, 143, 1)',
                'rgba(74, 105, 189, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
// biểu đồ 2
const myChart2 = new Chart(earning, {
    type: 'line',
    data: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [{
            label: 'Doanh thu theo tháng',
            data: [2000, 1700, 900, 1500, 2500, 1700,1900,1000,1100,1100,2000,2900],
            backgroundColor: [
                'rgba(235, 47, 6, 0.4)'
            ],
            borderColor: [
                'rgb(52, 152, 219,.4)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
// biểu đồ 3
const myChart3 = new Chart(customers, {
    type: 'pie',
    data: {
        labels: ['Khách mua tại shop', 'Khách mua hàng trực tuyến'],
        datasets: [{
            label: '# of Votes',
            data: [75, 25],
            backgroundColor: [
                'rgba(235, 47, 6, 0.4)',
                'rgba(255, 242, 0, 0.4)'
            ],
            borderColor: [
                'rgba(235, 47, 6, 1)',
                'rgba(255, 242, 0, 1)'
            ],
            borderWidth: 1,
            hoverOffset: 4
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
// biểu đồ 4
const myChart4 = new Chart(numberCustomers, {
    type: 'bar',
    data: {
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [{
            label: 'Lượng khách hàng theo tháng',
            data: [200, 170, 90, 100, 210, 100,190,105,130,130,270,290],
            backgroundColor: [
                'rgba(235, 47, 6, 0.4)',
                'rgba(255, 242, 0, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(197, 108, 240, 0.4)',
                'rgba(120, 224, 143, 0.4)',
                'rgba(74, 105, 189, 0.4)'
            ],
            borderColor: [
                'rgba(235, 47, 6, 1)',
                'rgba(255, 242, 0, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(197, 108, 240, 1)',
                'rgba(120, 224, 143, 1)',
                'rgba(74, 105, 189, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
// biểu đồ 5
const myChart5 = new Chart(blog, {
    type: 'bar',
    data: {
        labels: ['Hà Nội', 'Sài Gòn','Khác'],
        datasets: [{
            label: 'Biểu đồ thể hiện lượng người truy cập đến từ đâu',
            data: [55, 30, 15],
            backgroundColor: [
                'rgba(120, 224, 143, .4)',
                'rgba(255, 242, 0, .4)',
                'rgba(197, 108, 240, .4)'

            ],
            borderColor: [
                'rgba(120, 224, 143, 1)',
                'rgba(255, 242, 0, 1)',
                'rgba(197, 108, 240, 1)'
            ],
        }]
    },
});
// ====================================================
const textarea = document.querySelector('.chatbox-message-input')
const chatboxForm = document.querySelector('.chatBox_form')

textarea.addEventListener('input', function () {
	let line = textarea.value.split('\n').length

	if(textarea.rows < 6 || line < 6) {
		textarea.rows = line
	}

	if(textarea.rows > 1) {
		chatboxForm.style.alignItems = 'flex-end'
	} else {
		chatboxForm.style.alignItems = 'center'
	}
})
// ========================================================
// chat box
const chatboxMessageWrapper = document.querySelector('.chatBox')

chatboxForm.addEventListener('submit', function (e) {
e.preventDefault()

if(isValid(textarea.value)) {
    writeMessage()
    setTimeout(autoReply, 1000)
}
})
function addZero(num) {
    return num < 10 ? '0'+num : num
}

function writeMessage() {
    const today = new Date()
    let message = `
        <div class="message my_message">
            <p>${textarea.value.trim().replace(/\n/g, '<br>\n')}<span>${addZero(today.getHours())}:${addZero(today.getMinutes())}</span></p>
        </div>
    `
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
    chatboxForm.style.alignItems = 'center'
    textarea.rows = 1
    textarea.focus()
    textarea.value = ''
    scrollBottom()
}

function autoReply() {
    const today = new Date()
    let message = `
        <div class="message your_message">
            <p>Cảm ơn shop!!!<br><span>${addZero(today.getHours())}:${addZero(today.getMinutes())}</span></p>
        </div>
    `
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
    scrollBottom()
}
function scrollBottom() {
	chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
}

function isValid(value) {
	let text = value.replace(/\n/g, '')
	text = text.replace(/\s/g, '')

	return text.length > 0
}