import type { ValidationRule } from 'ant-design-vue/lib/form/Form'
import type { RuleObject } from 'ant-design-vue/lib/form/interface'
import { ref, computed, unref, Ref } from 'vue'
import { useI18n } from '/@/hooks/web/useI18n'
import { isMobile, isAccount } from '/@/utils/is'

export enum LoginStateEnum {
    LOGIN,
    REGISTER,
    RESET_PASSWORD,
    MOBILE,
    QR_CODE
}

const currentState = ref(LoginStateEnum.LOGIN)

export function useLoginState() {
    function setLoginState(state: LoginStateEnum) {
        currentState.value = state
    }

    const getLoginState = computed(() => currentState.value)

    function handleBackLogin() {
        setLoginState(LoginStateEnum.LOGIN)
    }

    return { setLoginState, getLoginState, handleBackLogin }
}

export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
    async function validForm() {
        const form = unref(formRef)
        if (!form) return
        const data = await form.validate()
        return data as T
    }

    return { validForm }
}

export function useFormRules(formData?: Recordable) {
    const { t } = useI18n()

    const getPasswordFormRule = computed(() => createRule(t('sys.login.passwordPlaceholder')))
    const getSmsFormRule = computed(() => createRule(t('sys.login.smsPlaceholder')))

    const validatePolicy = async (_: RuleObject, value: boolean) => {
        return !value ? Promise.reject(t('sys.login.policyPlaceholder')) : Promise.resolve()
    }

    const validateConfirmPassword = (password: string) => {
        return async (_: RuleObject, value: string) => {
            const val = value.trim()
            if (!val) {
                return Promise.reject(t('sys.login.passwordPlaceholder'))
            }
            if (val !== password) {
                return Promise.reject(t('sys.login.diffPwd'))
            }
            return Promise.resolve()
        }
    }

    const validateMobile = () => {
        return async (_: RuleObject, value: string) => {
            const val = value.trim()
            if (!val) {
                return Promise.reject(t('sys.login.mobilePlaceholder'))
            }
            if (!isMobile(val)) {
                return Promise.reject(t('sys.login.isMobile'))
            }
            return Promise.resolve()
        }
    }

    const validateAccount = () => {
        return async (_: RuleObject, value: string) => {
            const val = value.trim()
            if (!val) {
                return Promise.reject(t('sys.login.accountPlaceholder'))
            }
            if (!isAccount(val)) {
                return Promise.reject(t('sys.login.isAccount'))
            }
            return Promise.resolve()
        }
    }

    const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
        const passwordFormRule = unref(getPasswordFormRule)
        const smsFormRule = unref(getSmsFormRule)

        const mobileRule = {
            sms: smsFormRule,
            mobile: [{ validator: validateMobile(), trigger: 'blur' }]
        }

        const accountFormRule = {
            account: [{ validator: validateAccount(), trigger: 'blur' }]
        }

        switch (unref(currentState)) {
            // register form rules
            case LoginStateEnum.REGISTER:
                return {
                    ...accountFormRule,
                    password: passwordFormRule,
                    confirmPassword: [{ validator: validateConfirmPassword(formData?.password), trigger: 'change' }],
                    policy: [{ validator: validatePolicy, trigger: 'change' }],
                    ...mobileRule
                }

            // reset password form rules
            case LoginStateEnum.RESET_PASSWORD:
                return {
                    ...accountFormRule,
                    ...mobileRule
                }

            // mobile form rules
            case LoginStateEnum.MOBILE:
                return mobileRule

            // login form rules
            default:
                return {
                    ...accountFormRule,
                    password: passwordFormRule
                }
        }
    })
    return { getFormRules }
}

const createRule = (message: string) => {
    return [
        {
            required: true,
            message,
            trigger: 'change'
        }
    ]
}
