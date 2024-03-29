const $postsContainer = document.querySelector('.posting-container');

// db.json의 값들을 post로 가져오기 -> data fetch
const post = {};

// db.json의 데이터를 fetch
async function fetchPosts() {
    // db.json의 "posts" 가져오기
    const response = await fetch('http://localhost:1234/posts');
    const data = await response.json();

    return data;
}

const postTemplate = (post) => `
    <a href="/post-detail.html?id=${post.id}">
    <div class="posting-wrapper">
    <div class="posting-image-container">
        <img
        src="${post.image}"
        alt="게시글 이미지"
        />
    </div>
    <h2 class="">${post.title}</h2>
    <div class="profile-wrapper">
        <div class="profile-image-container">
            <img
                class="profile-image"
                src="${post.authorImage}"
                alt="profile-image"
            />
        </div>
        <span class="profile-nickname">${post.author}</span>
    </div>
    </div>
`;

// fetch가 성공했을 때 posts 리스트 가져오기
fetchPosts().then((posts) => {
    console.log(posts);
    /*
    posts 배열에서 각 post를 꺼내 postTemplate 그리기
     - post 자체는 스트링이기 때문에 쓸데없는 ","가 추가될 수 있음
       -> join으로 묶어주어 불필요한 문자열 삭제
     */
    $postsContainer.innerHTML = posts.map((post) => postTemplate(post)).join("");
})