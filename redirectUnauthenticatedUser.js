async function redirectAnauthenticated() {
    try {
        const users = await fetch("/users.json").then(res => res.json());
        const currentUser = JSON.parse(localStorage.getItem('current-user'));
        if (!currentUser) {
            return window.location = "/login.html";
        }
        const foundUser = users.find(user=>{
            return user.email === currentUser.email
        });
        if(!foundUser)  {
            window.location = "/login.html";
        }
    }catch(error){
        console.log(error)
        alert("Error fetching users");
    }
}
redirectAnauthenticated();