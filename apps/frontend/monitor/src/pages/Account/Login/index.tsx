import { useEffect } from 'react';

import { LoginForm } from '@/components/login-form';
import { usePublicKey } from '@/hooks/useAccount';

export default function LoginPage() {
    const { mutate: publicKeyMutation } = usePublicKey(key => {
        localStorage.setItem('publicKey', key);
    });

    useEffect(() => {
        const publicKey = localStorage.getItem('publicKey');
        if (!publicKey) {
            publicKeyMutation();
        }
    }, [publicKeyMutation]);

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="md:max-w-100">
                <LoginForm />
            </div>
        </div>
    );
}
