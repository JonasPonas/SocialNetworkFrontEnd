import {
  shallowMount
} from '@vue/test-utils'
import AddPost from '@/components/Add-Post.vue'
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);

describe('Add-Post.vue Test', () => {

  afterAll(() => {
    mock.restore();
  });
  beforeEach(() => {
    mock.reset();
  });
  it('Test add post', async () => {

    mock.onPost("http://localhost:5004/addPost", {
      description: 'Labas!',
      userId: 3,
      imageURL: null,
    }).reply(200);

    const wrapper = shallowMount(AddPost, {
      data: function () {
        return {
          user: {
            id: 3
          },
          postTextArea: "Labas!"
        }
      }
    })
    await wrapper.vm.addPost()
    expect(wrapper.vm.postTextArea).toBe('')

  })

  it('Test add post without description', async () => {

    mock.onPost("http://localhost:5004/addPost", {
      description: '',
      userId: 3,
      imageURL: null,
    }).reply(404);

    const wrapper = shallowMount(AddPost, {
      data: function () {
        return {
          user: {
            id: 3
          },
          postTextArea: ""
        }
      }
    })
    await wrapper.vm.addPost()
    expect(wrapper.vm.errors.length).toBe(1)
  })
})