// Checks if current user in localStorage exists in users
// If exists, nothing happens
// If does not exist, redirect

async function redirectAnauthenticated() {
    try {
        const users = KanyeDatabase.getUsers();
        const currentUser = KanyeDatabase.getCurrentUser();
        if (!currentUser) {
            return window.location = "/login.html";
        }
    } catch (error) {
        console.log(error)
        alert("Error fetching users");
    }
}
redirectAnauthenticated();