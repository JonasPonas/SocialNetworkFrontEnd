import {
    mount
} from '@vue/test-utils'
import SignIn from '@/components/SignIn.vue'
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);

describe('SignIn.vue Test', () => {
    const wrapper = mount(SignIn, {
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
    it('Test show notification', async () => {
        wrapper.vm.showNotification('bugu', true)
        expect(wrapper.vm.notificationColor).toBe('red')
        expect(wrapper.vm.signinError).toBe('bugu')
    })
    it('Test login fail', async () => {
        const loginName = ''
        const loginPassword = ''
        await wrapper.findComponent({
            ref: 'loginbtn'
        }).trigger('click')
        await wrapper.findComponent({
            ref: 'login'
        }).findComponent({
            ref: 'loginName'
        }).setValue(loginName)
        await wrapper.findComponent({
            ref: 'login'
        }).findComponent({
            ref: 'loginPassword'
        }).setValue(loginPassword)
        wrapper.vm.login()
        expect(wrapper.vm.signinError).toBe('Fill in all the fields.')
    })
    it('Test login good', async () => {
        const loginName = 'rytis.razmus@gmail.com'
        const loginPassword = '123456'
        await wrapper.findComponent({
            ref: 'loginbtn'
        }).trigger('click')
        await wrapper.findComponent({
            ref: 'login'
        }).findComponent({
            ref: 'loginName'
        }).setValue(loginName)
        await wrapper.findComponent({
            ref: 'login'
        }).findComponent({
            ref: 'loginPassword'
        }).setValue(loginPassword)
        mock.onPost("http://localhost:5004/login", {
            email: loginName,
            password: loginPassword,
        }).reply(200,
            'success'
        );
        axios
            .get("http://localhost:5004/login", {
                email: loginName,
                password: loginPassword,
            })
            .then(() => {
                expect(wrapper.vm.signinError).toBe('')
            }).catch(() => {
                // console.log(e);
            });

    })
    it('Test register fail', async () => {
        await await wrapper.findComponent({
            ref: 'registerbtn'
        }).trigger('click')
        await wrapper.vm.register()
        await expect(wrapper.vm.signinError).toBe('Fill in all the fields.')
    })
    it('Test register good', async () => {
        const email = 'rytis.razmus@gmail.com'
        const name = "rytis"
        const surname = "razmus"
        const phone = "112"
        const birthday = "2020-12-01"
        const password = "123456"
        await wrapper.findComponent({
            ref: 'registerbtn'
        }).trigger('click')
        await wrapper.findComponent({
            ref: 'register'
        }).findComponent({
            ref: 'name'
        }).setValue(name)
        await wrapper.findComponent({
            ref: 'register'
        }).findComponent({
            ref: 'surname'
        }).setValue(surname)
        await wrapper.findComponent({
            ref: 'register'
        }).findComponent({
            ref: 'email'
        }).setValue(email)
        await wrapper.findComponent({
            ref: 'register'
        }).findComponent({
            ref: 'phone'
        }).setValue(phone)
        await wrapper.findComponent({
            ref: 'register'
        }).findComponent({
            ref: 'birthday'
        }).setValue(birthday)
        await wrapper.findComponent({
            ref: 'register'
        }).findComponent({
            ref: 'password'
        }).setValue(password)
        mock.onPost("http://localhost:5004/register", {
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            birthday: birthday,
            password: password,
        }).reply(200,
            'success'
        );
        axios
            .get("http://localhost:5004/register", {
                name: name,
                surname: surname,
                email: email,
                phone: phone,
                birthday: birthday,
                password: password,
            })
            .then(() => {
                expect(wrapper.vm.signinError).toBe('')
            }).catch(() => {
                // console.log(e);
            });

    })
})