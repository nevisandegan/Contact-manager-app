import * as Yup from 'yup';

export const contactSchema=Yup.object().shape(
    {
        fullname:Yup.string().required("نام نام خانوادگی را بنویس"),
        mobile:Yup.number().required("موبایل را وارد کنید"),
        email:Yup.string().email("ادرس ایمیل معتبر نیست").required("ادرس ایمیل را وارد کنید"),
        job:Yup.string().nullable(),
        group:Yup.string().required("گروه خود را مشخص کنید")
    }
)


