const app = Vue.createApp({
    data() {
        return {
            messages: JSON.parse(localStorage.getItem('messages')) || [
                {
                    author: '王小明',
                    time: '2024-01-20 14:30',
                    content: '請問貴校的入學方式有哪些呢？',
                    likes: 5,
                    replies: [],
                    showReplyForm: false,
                    newReply: ''
                },
                {
                    author: '李小華',
                    time: '2024-01-19 16:45',
                    content: '想了解更多關於課程安排的細節。',
                    likes: 3,
                    replies: [],
                    showReplyForm: false,
                    newReply: ''
                }
            ],
            newMessage: {
                author: '',
                content: ''
            }
        }
    },
    methods: {
        submitMessage() {
            if (this.newMessage.author && this.newMessage.content) {
                const now = new Date()
                const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
                
                this.messages.unshift({
                    author: this.newMessage.author,
                    time: formattedTime,
                    content: this.newMessage.content,
                    likes: 0,
                    replies: [],
                    showReplyForm: false,
                    newReply: ''
                })
                
                this.saveMessages()
                this.newMessage.author = ''
                this.newMessage.content = ''
            }
        },
        addLike(index) {
            this.messages[index].likes++
            this.saveMessages()
        },
        toggleReplyForm(index) {
            this.messages[index].showReplyForm = !this.messages[index].showReplyForm
        },
        submitReply(index) {
            if (this.messages[index].newReply) {
                const now = new Date()
                const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
                
                this.messages[index].replies.push({
                    content: this.messages[index].newReply,
                    time: formattedTime
                })
                
                this.messages[index].newReply = ''
                this.messages[index].showReplyForm = false
                this.saveMessages()
            }
        },
        deleteMessage(index) {
            this.messages.splice(index, 1)
            this.saveMessages()
        },
        saveMessages() {
            localStorage.setItem('messages', JSON.stringify(this.messages))
        }
    }
})

app.mount('.message-board')
