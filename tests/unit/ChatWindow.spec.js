import {
    shallowMount
} from '@vue/test-utils'
import ChatWindow from '@/components/ChatWindow.vue'
const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

describe('ChatWindow.vue Test', () => {
    const wrapper = shallowMount(ChatWindow, {
        propsData: {
            friend: {
                id: 3
            },
            socket: null,
        },
        mocks: {
            $store: {
                state: {
                    account: {
                        user: {
                            id: 3
                        }
                    }
                }
            }
        },
    })

    afterAll(() => {
        mock.restore();
    });
    beforeEach(() => {
        mock.reset();
    });
    it('Test makeId', async () => {
        let id = wrapper.vm.makeid(20)
        expect(id.length).toBe(20)
    })

    it('Test get bubble style', async () => {
        let bubbleStyle = wrapper.vm.getBubbleStyle({fromUser: 3})
        expect(bubbleStyle.background).toBe("lightgreen")
    })
})