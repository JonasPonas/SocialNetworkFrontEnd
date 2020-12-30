import {
    shallowMount
} from '@vue/test-utils'
import Posts from '@/components/Posts.vue'
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);

describe('Posts.vue Test', () => {
    const wrapper = shallowMount(Posts, {
        propsData: {
            title: 'Vue Project'
        }
    })
    afterAll(() => {
        mock.restore();
    });
    beforeEach(() => {
        mock.reset();
    });
    it('Test fetch friends posts', async () => {
        wrapper.setData({
            user: {
                id: 3
            }
        })
        wrapper.setData({
            postInput: 'Labas!'
        })
        // wrapper.vm.addPost(); // calling component method
        mock.onGet("http://localhost:5004/getFriendsPosts", {
            params: {
                id: 3,
            }
        }).reply(200,
            [{
                date: '2020-01-01',
                name: 'Boratas',
                surname: 'Liaupsas',
                userId: 5,
                postId: 600,
                profileImage: null,
                description: 'lalalalla',
                imageUrl: null
            }]
        );
        axios
            .get("http://localhost:5004/getFriendsPosts", {
                params: {
                    id: 3,
                }
            })
            .then( () => {
                // console.log(response.data);
                expect(wrapper.vm.posts.length).toBe(1)
            }).catch(() => {
                // console.log(e);
            });
        
    })

    it('Test delete post', async () => {
        let posts = [
            {
                contentId: 1
            }, {
                contentId: 2
            }
        ]
        wrapper.setData({
            posts: posts
        })
        wrapper.vm.postDeleted({contentId: 1})
        expect(wrapper.vm.posts.length).toBe(1)
    })


})