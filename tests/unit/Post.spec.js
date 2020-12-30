import {
    shallowMount
} from '@vue/test-utils'
import Post from '@/components/Post.vue'
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);

describe('Post.vue Test', () => {
    const wrapper = shallowMount(Post, {
        propsData: {
            title: 'Vue Project'
        }
    })
    afterAll(() => {
        mock.restore();
    });
    beforeEach(() => {
        wrapper.setProps({
            post: {
                postId: 12,
                contentId: 111,
                posterImageHover: false,
                profileImage: null,
                nameHover: false,
                name: 'Jonas',
                surname: 'Ablomas',
                isEditing: false,
                description: 'aprasymas'
            }
        })
        mock.reset();
    });
    it('Test add comment', async () => {

        expect(wrapper.vm.post.posterImageHover).toBe(false)
        mock.onPost("http://localhost:5004/addComment", {
            postId: 111,
            text: 'Komentaras',
            fromUser: 3,
        }).reply(200,
            'success'
        );
        axios
            .get("http://localhost:5004/addComment", {
                postId: 111,
                text: 'Komentaras',
                fromUser: 3,
            })
            .then(() => {
                expect(wrapper.vm.showingComments).toBe(true)
            }).catch(() => {
                // console.log(e);
            });

    })
    it('Test edit post', async () => {
        mock.onPost("http://localhost:5004/updateContentDescription", {
            contentId: 111,
            description: 'uuuu',
        }).reply(200,
            'success'
        );
        axios
            .post("http://localhost:5004/updateContentDescription", {
                contentId: 111,
                description: 'uuuu',
            })
            .then(() => {
                expect(wrapper.vm.errors).toBe([])
            }).catch(() => {
                // console.log(e);
            });
    })
    it('Test toggle edit post', () => {
        wrapper.vm.editPost(wrapper.vm.post)
        expect(wrapper.vm.post.isEditing).toBe(true)
    })
    it('Test get comments', async () => {
        mock.onGet("http://localhost:5004/getComments", {
            params: {
                postId: 12,
            },
        }).reply(200,
            'success'
        );
        axios
            .get("http://localhost:5004/getComments", {
                params: {
                    postId: 12,
                },
            })
            .then(() => {
                expect(wrapper.vm.comments.length).toBe(1)
            }).catch(() => {
                // console.log(e);
            });
    })
})