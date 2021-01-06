import {
    mount
} from '@vue/test-utils'
import Post from '@/components/Post.vue'
var axios = require("axios");

var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);
var wrapper
describe('Post.vue Test', () => {
    afterAll(() => {
        mock.restore();
    });
    beforeEach(() => {
        wrapper = mount(Post, {
            propsData: {
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
            },
            data: function () {
                return {
                    fromUser: 3
                }
            }
        })
        mock.reset();
    });
    it('Test add comment', async () => {
        mock.onPost("http://localhost:5004/addComment", {
            postId: 12,
            text: 'Labas',
            fromUser: 3,
        }).reply(200);

        await wrapper.vm.addComment('Labas')
        expect(wrapper.vm.showingComments).toBe(true)
    })

    it('Test showComments', async () => {

        mock.onGet("http://localhost:5004/getComments", {
            params: {
                postId: 12,
              },
        }).reply(200, [
            1,2,3,4
        ]);
        wrapper = mount(Post, {
            propsData: {
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
            },
            data: function () {
                return {
                    fromUser: 3
                }
            }
        })
        wrapper.vm.showComments(true).then((r) => {
            expect(wrapper.vm.showingComments).toBe(true)
            expect(wrapper.vm.comments.length).toBe(4)
        }).catch(e => {
            console.log(e, "<-----");
        }) 
    })
})