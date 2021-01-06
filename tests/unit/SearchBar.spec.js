import {
    shallowMount
} from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue'
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);

describe('Posts.vue Test', () => {
    var wrapper = null
    afterAll(() => {
        mock.restore();
    });
    beforeEach(() => {
        wrapper = shallowMount(SearchBar, {
            data: function () {
                return {
                    txt: "pe"
                }
            }
        })
        mock.reset();
    });

    it('Test dropdown visible', async () => {
        // wrapper.setData({ txt: "pe"})
        mock.onPost("http://localhost:5004/searchUser", {
            fullName: "pe",
        }).reply(200, [{
                id: 5,
                name: "petras",
                surname: "Petraits",
                imageUrl: "https://i.pinimg.com/236x/ba/06/5e/ba065e39ff4c952bfbcfe4b1f99f4260.jpg"
            },
            {
                id: 11,
                name: "Peter",
                surname: "Parker",
                imageUrl: "https://media.giphy.com/media/SF9Z0shNT07T2/giphy.gif"
            },
            {
                id: 33,
                name: "Petras",
                surname: "Jonaitis",
                imageUrl: "https://s2.15min.lt/images/photos/2015/10/12/original/aktoriaus-petro-dimsos-teismas-561ba4993b593.jpg"
            }
        ]);
        await wrapper.vm.search()
        expect(wrapper.vm.dropdownVisible).toBe(true)
    })

    it('test set images', () => {
        wrapper = shallowMount(SearchBar, {
            data: function () {
                return {
                    users: [{
                        id: 5,
                        name: "petras",
                        surname: "Petraits",
                        imageUrl: "https://i.pinimg.com/236x/ba/06/5e/ba065e39ff4c952bfbcfe4b1f99f4260.jpg"
                    },
                    {
                        id: 11,
                        name: "Peter",
                        surname: "Parker",
                        imageUrl: null
                    },
                    {
                        id: 33,
                        name: "Petras",
                        surname: "Jonaitis",
                        imageUrl: "https://s2.15min.lt/images/photos/2015/10/12/original/aktoriaus-petro-dimsos-teismas-561ba4993b593.jpg"
                    }
                ]
                }
            }
        })

        wrapper.vm.setImages()
        let result = wrapper.vm.users.filter(user => user.imageUrl == null)
        expect(result.length).toBe(0)
    })

    it('test dropdown invisible when search results are an empty array', async() => {
        wrapper.setData({users: []})
        mock.onPost("http://localhost:5004/searchUser", {
            fullName: "pe",
        }).reply(200, []);
        await wrapper.vm.search()
        expect(wrapper.vm.dropdownVisible).toBe(false)
    })

    it('test search fail', async() => {
        wrapper.setData({users: []})
        mock.onPost("http://localhost:5004/searchUser", {
            fullName: "pe",
        }).reply(500);
        await wrapper.vm.search()
        expect(wrapper.vm.errors.length).toBe(1)
    })

});