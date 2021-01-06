import {
    shallowMount
} from '@vue/test-utils'
import Posts from '@/components/Posts.vue'
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);

describe('Posts.vue Test', () => {
    var wrapper = null
    afterAll(() => {
        mock.restore();
    });
    beforeEach(() => {
        wrapper = shallowMount(Posts, {
            propsData: {
                title: 'Vue Project'
            },
            data: function () {
                return {
                    userId: 6
                }
            }
        })
        mock.reset();
    });
    it('Test fetch friends posts', async () => {
        wrapper.setData({

        })
        // wrapper.vm.addPost(); // calling component method
        mock.onGet("http://localhost:5004/getFriendsPosts", {
            params: {
                id: 6,
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
        await wrapper.vm.fetchPosts()
        expect(wrapper.vm.posts.length).toBe(1)
    })

    it('Test delete post', async () => {
        let posts = [{
            contentId: 1
        }, {
            contentId: 2
        }]
        wrapper.setData({
            posts: posts
        })
        wrapper.vm.postDeleted({
            contentId: 1
        })
        expect(wrapper.vm.posts.length).toBe(1)
    })

    it('Test omg nothing here :O', async () => {
        let posts = []
        wrapper.setData({
            posts: posts
        })
        const h1 = wrapper.find('h1')
        expect(h1.text()).toBe('OMG NOTHING HERE :O')
    })

})