<template>
    <template v-if="getShow">
        <LoginFormTitle class="enter-x" />
        <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
            <FormItem name="username" class="enter-x">
                <Input class="fix-auto-fill" size="large" v-model:value="formData.username" :placeholder="t('sys.login.userName')" />
            </FormItem>
            <FormItem name="mobile" class="enter-x">
                <Input size="large" v-model:value="formData.mobile" :placeholder="t('sys.login.mobile')" class="fix-auto-fill" />
            </FormItem>
            <FormItem name="sms" class="enter-x">
                <CountdownInput
                    size="large"
                    class="fix-auto-fill"
                    v-model:value="formData.sms"
                    :placeholder="t('sys.login.smsCode')"
                    :sendCodeApi="sendCodeApi"
                />
            </FormItem>
            <FormItem name="password" class="enter-x">
                <StrengthMeter size="large" v-model:value="formData.password" :placeholder="t('sys.login.password')" />
            </FormItem>
            <FormItem name="repassword" class="enter-x">
                <InputPassword size="large" visibilityToggle v-model:value="formData.repassword" :placeholder="t('sys.login.confirmPassword')" />
            </FormItem>

            <FormItem class="enter-x" name="policy">
                <!-- No logic, you need to deal with it yourself -->
                <Checkbox v-model:checked="formData.policy" size="small">
                    {{ t('sys.login.policy') }}
                </Checkbox>
            </FormItem>

            <Button type="primary" class="enter-x" size="large" block @click="handleRegister" :loading="loading">
                {{ t('sys.login.registerButton') }}
            </Button>
            <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
                {{ t('sys.login.backSignIn') }}
            </Button>
        </Form>
    </template>
</template>
<script lang="ts" setup>
    import { reactive, ref, unref, computed } from 'vue'
    import LoginFormTitle from './LoginFormTitle.vue'
    import { Form, Input, Button, Checkbox } from 'ant-design-vue'
    import { StrengthMeter } from '/@/components/StrengthMeter'
    import { CountdownInput } from '/@/components/CountDown'
    import { useI18n } from '/@/hooks/web/useI18n'
    import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin'
    import { registerApi } from '/@/api/sys/user'
    import { useMessage } from '/@/hooks/web/useMessage'

    const { createSuccessModal } = useMessage()

    const FormItem = Form.Item
    const InputPassword = Input.Password
    const { t } = useI18n()
    const { handleBackLogin, getLoginState } = useLoginState()

    const formRef = ref()
    const loading = ref(false)

    const formData = reactive({
        username: '',
        mobile: '',
        sms: '',
        password: '',
        repassword: '',
        policy: false
    })

    const { getFormRules } = useFormRules(formData)
    const { validForm } = useFormValid(formRef)

    const sendCodeApi = (): Promise<string> => {
        return new Promise((resolve) => {
            // 模拟短信请求成功后, 返回的验证码为4456
            setTimeout(() => {
                resolve('4456')
            }, 3000)
        })
    }

    const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

    async function handleRegister() {
        const data = await validForm()
        if (!data) return
        const result = await registerApi(data)
        if (!result.code) {
            createSuccessModal({ title: t('sys.api.tip'), content: t('sys.api.registerSuccess') })
        }
    }
</script>
