import { Transition } from "@headlessui/react";

export default function ActionStatusAlert({ notification }) {
    const isVisible = Boolean(notification?.show);
    const isSuccess = notification?.type === "success";

    return (
        <Transition
            show={isVisible}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
        >
            <div
                className={`rounded-2xl border px-4 py-3 text-sm shadow-sm ${
                    isSuccess
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border-rose-200 bg-rose-50 text-rose-800"
                }`}
            >
                <p className="font-semibold">
                    {isSuccess ? "Success" : "Action failed"}
                </p>
                <p className="mt-1 leading-6">{notification?.message}</p>
            </div>
        </Transition>
    );
}
