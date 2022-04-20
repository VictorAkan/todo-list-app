const app = Vue.createApp({
    data() {
        return {
            monthName:"",
            dayName:"",
            dayNumber:null,
            year:null,
            week:"",
            month:"",
            newMemo:"",
            comma:",",
            message:"go back to date",
            // months:["January","February","March","April","May","June","July","August","September","October","November","December"],
            // days:["Sunday","Monday","Teusday","Wednesday","Thursday","Friday","Saturday"],
            todoText :[
                // { task:"", memo:"",isCompleted:false}
            ],
            todoTop :[
                // { topTask:"", topmemo:"",isCompleted:false}
            ],
            isButton:true,
            isHidden: false,
            isRHidden: false,
            newTask:"",
            isCompleted:false
        }
    },
    computed: {
        todoTopComputed() {
            return this.todoTop
        },
        // pinToTop(task) {
        //     // let filteredTodo = this.todoText.filter((pinned) => {
        //     //     pinned.todo == this.todoText
        //     // });
        //     // filteredTodo = task;
        //     // // return this.todoTop;
        //     // console.log(filteredTodo);
        //     // // this.todoTop.push(task)
        //     // // console.log(task)
        // },
    },
    methods: {
        showDate() {
            const lang = navigator.language;
            let date = new Date();
            this.dayNumber = date.getDate();
            this.month = date.getMonth();
            this.dayName = date.toLocaleString( lang, { weekday: "long"});
            this.monthName = date.toLocaleString( lang, { month: "long"});
            this.year = date.getFullYear();
            this.week = null
            this.isButton = false
            this.comma = ","
        },
        showDay() {
            this.monthName = null,
            this.year = null
            this.isButton = true
            this.comma = ""
        },
        showWeek() {
            this.week = "First Week"
            this.monthName = null,
            this.year = null,
            this.dayName = "",
            this.dayNumber = null
            this.isButton = true
            this.comma = ""
        },
        showMonth() {
            this.year = null,
            this.dayName = "",
            this.dayNumber = null
            this.isButton = true
            this.comma = ""
        },
        showYear() {
            this.dayName = null,
            this.monthName = null,
            this.dayNumber = null
            this.isButton = true
            this.comma = ""
        },
        saveTask() {
            if ( !this.newTask ) {
                return;
            }
            this.todoText.push({task:this.newTask,memo:this.newMemo,isCompleted:false})
            this.isHidden = false
            this.isRHidden = true
            this.newTask = ""
            this.saveWork()
        },
        pinToTop(task) {
            this.todoTop.push(task)
            console.log(task)
        },
        unpinFromTop(task) {
            this.todoTop.splice(task)
        },
        deleteTask(task) {
            this.todoDelete = this.todoText.splice(this.todoText.indexOf(task), 1)
            localStorage.setItem('todoText', this.todoText.indexOf(1))
        },
        deleteTop (task) {
            this.todoTop.splice(this.todoTop.indexOf(task), 1)
        },
        checkIt() {
            let filtered = this.todoText.filter((task) => this.todoText.indexOf(task), 1)
            this.isCompleted = true
            filtered = this.isCompleted
        },
        unCheckIt() {
            this.isCompleted = false
        },
        saveWork() {
            const parsed = JSON.stringify(this.todoText);
            localStorage.setItem('todoText', parsed)
        },
    },
    mounted() {
        this.showDate();
        this.isHidden = true
        this.isRHidden = true
        if (localStorage.getItem('todoText')) {
            try {
                this.todoText = JSON.parse(localStorage.getItem('todoText'));
            } catch (e) {
                localStorage.removeItem('todoText')
            }
        }
        this.deleteTask()
    }
})
app.mount("#app");





