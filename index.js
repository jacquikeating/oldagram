// Global variables
const feed = document.getElementById("feed");
const posts = [];


// Object constructors for users and posts
function User(username, name) {
    this.username = username;
    this.name = name;
    this.avatar = `images/avatar-${this.username}.jpg`;
 }
 
function Post(op, loc, image, likes, caption, comments) {
     this.op = op;
     this.loc = loc;
     this.image = image;
     this.likes = likes;
     this.caption = caption;
     this.comments = comments;
     this.pushToArray = posts.push(this);   // Push to posts array
     this.postNum = posts.indexOf(this);    // Get an index number to use in element IDs
 }


// Method to render post
// I should probably split this into multiple functions, but I'm not sure where or how to divide it
Post.prototype.makePost = function() {
    
    // Create a post element, apply class for styling, and append to feed
    let newPost = document.createElement("article");
    newPost.classList.add("post");
    feed.appendChild(newPost);
    
    // Populate post with content. Is it okay to have this huge chunk of innerHTML? 
    newPost.innerHTML = `<div class="op-info">
                            <img class="op-avatar" src="images/avatar-${this.op.username}.jpg" 
                            alt="${this.op.name}'s avatar">
                            <div class="op-name-loc">
                                <a href="#" class="op-fullname-link">${this.op.name}</a>
                                <a href="#" class="location-link">${this.loc}</a>
                            </div>
                         </div>
                        
                         <img class="post-img" src="${this.image}" id="post${this.postNum}Img" alt="Image uploaded by user">
                
                         <div class="post-info">
                            <div class="icons-container">
                                <img class="icon" id="post${this.postNum}LikeBtn" src="images/icon-heart.png" alt="Like icon">
                                <img class="icon" src="images/icon-comment.png" alt="Comment icon">
                                <img class="icon" src="images/icon-dm.png" alt="Message icon">
                            </div>
                            
                            <p class="likes" id="post${this.postNum}LikesDisplay">
                                ${this.likes} likes</p>
                                
                            <p class="username-and-caption">
                                <a href="#" class="op-username">${this.op.username}</a>
                                ${this.caption}</p>
                                
                            <a href="#" class="comments">View all ${this.comments} comments</a>
                            <a href="#" class="comments">Add a comment...</a> 
                            
                         </div>
                            `
    
    // likesCount variable, because using this.likes in the function was printing as NaN
    let likesCount = this.likes;
    
    // Target like button, text holding the number of likes, and posted image
    let likeBtn = document.getElementById(`post${this.postNum}LikeBtn`);
    let likesDisplay = document.getElementById(`post${this.postNum}LikesDisplay`);
    let postImage = document.getElementById(`post${this.postNum}Img`);
    
    // Increment likesCount when likeBtn is clicked, and update text with new total
    likeBtn.addEventListener("click", function() {
        likesCount++;
        likesDisplay.textContent = `${likesCount} likes`;
    });
    
    // Same as above, but for double-clicking the image
    postImage.addEventListener("dblclick", function() {
        likesCount++;
        likesDisplay.textContent = `${likesCount} likes`;
    });
                        
};


// Users
const vincey1853 = new User("vincey1853", "Vincent van Gogh");
const gus1819 = new User("gus1819", "Gustave Courbet");
const jd1735 = new User("jd1735", "Joseph Ducreux");


// Posts
const post0 = new Post(vincey1853, "Zundert, Netherlands", "images/post-vangogh.jpg", 21492, "just took a few mushrooms lol", 62);
const post1 = new Post(gus1819, "Ornans, France", "images/post-courbet.jpg", 4, "i'm feelin a bit stressed tbh", 1);
const post2 = new Post(jd1735, "Paris, France", "images/post-ducreux.jpg", 152, "gm friends! which coin are YOU stacking up today?? post below and WAGMI!", 15);


// Render all posts
for(i = 0; i < posts.length; i++) {
    posts[i].makePost();
}