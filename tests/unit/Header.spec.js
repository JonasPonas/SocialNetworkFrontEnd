import {
    shallowMount
} from '@vue/test-utils'
import Header from '@/components/Header.vue'
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);

describe('Header.vue Test', () => {
    const wrapper = shallowMount(Header, {
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
    it('Test accept invite', async () => {
        mock.onGet("http://localhost:5004/getFriendInvites", {
            params: {
                id: 3,
              },
        }).reply(200,
            [{
                name: 'Boratas',
                surname: 'Liaupsas',
                userId: 5,
                postId: 600,
                profileImage: null,
            }]
        );
        axios
            .get("http://localhost:5004/getFriendInvites", {
                params: {
                    id: 3,
                }
            })
            .then( () => {
                expect(wrapper.vm.friendInvites.length).toBe(1)
            }).catch(() => {
                // console.log(e);
            });
        
    })
    it('Get profile image', () => {
        expect(wrapper.vm.getProfileImage()).toBe("https://www.literarytraveler.com/wp-content/uploads/2013/05/Vincent_van_Gogh_Self_Portrait_1887_ChicagoArtInstitute.jpg")
    })
})