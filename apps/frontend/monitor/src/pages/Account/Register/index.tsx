import { RegisterForm } from '@/components/register-form';

export default function RegisterPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="md:max-w-100">
                <RegisterForm />
            </div>
        </div>
    );
}
