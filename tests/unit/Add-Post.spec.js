import {
  shallowMount
} from '@vue/test-utils'
import AddPost from '@/components/Add-Post.vue'
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);



describe('Add-Post.vue Test', () => {
  const wrapper = shallowMount(AddPost, {
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
  it('Test add post', async () => {
    wrapper.setData({
      user: {
        id: 3
      }
    })
    wrapper.setData({
      postInput: 'Labas!'
    })
    mock.onPost("http://localhost:5004/addPost", {
      description: 'Labas!',
      userId: 3,
      imageURL: null,
    }).reply('success');
    axios
      .post("http://localhost:5004/addPost", {
        description: 'Labas!',
        userId: 3,
        imageURL: null,
      })
      .then(() => {
        expect(wrapper.vm.postInput).toBe('')
      }).catch(() => {
        // console.log(e);
      });
    
  })



})