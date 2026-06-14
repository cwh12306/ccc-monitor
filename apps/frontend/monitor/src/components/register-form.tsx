import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useRegister } from '@/hooks/useAccount';
import { cn } from '@/lib/utils';

const registerSchema = z
    .object({
        email: z.string().email('请输入有效的邮箱地址'),
        username: z.string().min(2, '用户名至少2个字符'),
        password: z.string().min(6, '密码至少6个字符'),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: '两次输入的密码不一致',
        path: ['confirmPassword'],
    });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm({ className, ...props }: React.ComponentProps<'div'>) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
    });

    const { mutate: registerMutation } = useRegister();

    const onSubmit = async (data: RegisterFormValues) => {
        registerMutation({
            email: data.email,
            username: data.username,
            password: data.password,
        });
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Register</h1>
                                <p className="text-balance text-muted-foreground">Register to start using your monitor account</p>
                            </div>
                            <Field data-invalid={!!errors.email}>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <FieldDescription className="text-xs">to receive error alert email</FieldDescription>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    aria-invalid={!!errors.email}
                                    {...register('email')}
                                />
                                <FieldError errors={[errors.email]} />
                            </Field>
                            <Field data-invalid={!!errors.username}>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input id="username" placeholder="Username" aria-invalid={!!errors.username} {...register('username')} />
                                <FieldError errors={[errors.username]} />
                            </Field>
                            <Field data-invalid={!!errors.password}>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                </div>
                                <Input id="password" type="password" aria-invalid={!!errors.password} {...register('password')} />
                                <FieldError errors={[errors.password]} />
                            </Field>
                            <Field data-invalid={!!errors.confirmPassword}>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="confirm-password">Confirm password</FieldLabel>
                                </div>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    aria-invalid={!!errors.confirmPassword}
                                    {...register('confirmPassword')}
                                />
                                <FieldError errors={[errors.confirmPassword]} />
                            </Field>
                            <Field>
                                <Button type="submit">Register</Button>
                            </Field>
                            <FieldDescription className="text-center">
                                Already have an account? <a onClick={() => navigate('/account/login')}>Sign in</a>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    );
}
