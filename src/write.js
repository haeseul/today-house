export const POST_MAX_FILE_SIZE = 1000 * 1000 * 1;  // 약 1MB

const $goBack = document.querySelector('.go-back');
const $titleInput = document.querySelector('.title-input');
const $contentInput = document.querySelector('.content-input');
const $titleLength = document.querySelector('.current-title-length');
const $publishButton = document.querySelector('.publish-button');
const $postForm = document.querySelector('.post-form');

const $coverImage = document.querySelector('.cover-image');
const $imageUpload =  document.querySelector('#cover-image-upload');
const $imageReUpload =  document.querySelector('#cover-image-re-upload');

const $fileReUpload = document.querySelector('.file-re-upload-wrapper');

function checkInputLength({target}) {
    if (target.value && target.value.length > 30) {
        alert('30자를 초과한 제목을 입력할 수 없습니다.');
        return
    }
    $titleLength.innerText = target.value.length;
}

function uploadImage(event) {
    const file = event.target.files[0];     // event.target.files 배열의 첫번째 인자가 file명
    
    const fileReader = new FileReader();    // 파일 업로드 시 이용하는 fileReader API 사용
    fileReader.readAsDataURL(file);         // file을 url로 바꿈
    fileReader.onload = (event) => {        // url로 바뀌면 onload 이벤트로 트리거 생성
        // 서버랑 통신하지 않고 미리보기 -> 서버 비용과 불필요한 데이터 낭비X
        $coverImage.src = event.target.result;
    };

    $coverImage.style.display = 'block';
    $fileReUpload.style.display = 'block';
}

async function postSubmit(event) {
    // 폼 제출 시 새로고침되는 디폴트 효과 제거
    event.preventDefault()

    try {
        await fetch(`http://localhost:1234/posts`, {
            method: 'POST',
            // axios 형식이 아니라 json으로 넣어준다고 header에 명시
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                title: $titleInput.value,
                content: $contentInput.value,
                image: $coverImage.src,
                author: '새로운 유저',
                authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            })
        });

        // 발행 후 리스트로 이동하기
        window.location.assign('/post-list.html');
    } catch (error) {
        alert(error);
    }
}

$imageUpload.addEventListener('change', uploadImage);
$imageReUpload.addEventListener('change', uploadImage);

$titleInput.addEventListener('input', checkInputLength)
// 발행 버튼을 누르면 postForm 의 submit event 발행
$postForm.addEventListener('submit', postSubmit);
$publishButton.addEventListener('click', () => {
    // despatchEvent : 편리하게 이벤트 발행 가능
    $postForm.dispatchEvent(new Event('submit'));
})

$goBack.addEventListener('click', () => {
    // 한 단계만 뒤로가기
    window.history.back(1);
})