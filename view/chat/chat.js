
const token = localStorage.getItem('token');
let selectedUserId = null;

document.addEventListener('DOMContentLoaded', async () => {
    await loadUsers();
    document.getElementById('chatForm').addEventListener('submit', chatForm);
});

async function chatForm(event) {
    try {
        event.preventDefault();
        if (!selectedUserId) {
            alert('Select a user first.');
            return;
        }
        const content = event.target.messageInput.value;
        await sendMessage(content);
        event.target.messageInput.value = ''; // clear input
        await loadMessages(selectedUserId);
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message.');
    }
}

async function loadUsers() {
    try {
        const response = await fetch(`/user/all-users`, 
            {
                method:'GET',
                 headers: { Authorization: token } });
                 const data=await response.json();
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
       data.users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name + ' (' + user.email + ')';
            li.addEventListener('click', () => selectUser(user.id, user.name));
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading users:', error);
        alert('Error loading users.');
    }
}

async function selectUser(userId, userName) {
    try {
        selectedUserId = userId;
        document.getElementById('chatHeader').textContent = `Chatting with ${userName}`;
        await loadMessages(userId);
    } catch (error) {
        console.error('Error selecting user:', error);
    }
}

async function loadMessages(receiverId) {
    try {
        const response = await fetch(`/message/${receiverId}`, { 
            method:'GET',
            headers: { Authorization: token } });
            const data=await response.json();
            console.log('messages received',data)
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';
        data.messages.forEach(msg => {
            const div = document.createElement('div');
            div.textContent = (msg.senderId === selectedUserId ? 'Them' : 'You') + ': ' + msg.content;
            chatMessages.appendChild(div);
            alert('lod success')
        });
    } catch (error) {
        console.error('Error loading messages:', error);
        alert('Error loading messages.');
    }
}

async function sendMessage(content) {
    try {
        
        await fetch(`/message`, {
   method: 'POST',
   headers: { 
      'Content-Type': 'application/json',
      Authorization:token
   },
   body: JSON.stringify({ content, receiverId: selectedUserId })
});
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Error sending message.');
    }
}