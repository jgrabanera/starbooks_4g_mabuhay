import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

export default function ActionConfirmationModal({
    show,
    onClose,
    onConfirm,
    title,
    message,
    confirmLabel = "Confirm",
    processing = false,
}) {
    return (
        <Modal show={show} onClose={onClose} maxWidth="lg">
            <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
                    Confirmation
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-950">
                    {title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                    {message}
                </p>

                <div className="mt-6 flex flex-wrap justify-end gap-3">
                    <SecondaryButton type="button" onClick={onClose}>
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton
                        type="button"
                        onClick={onConfirm}
                        disabled={processing}
                    >
                        {processing ? "Processing..." : confirmLabel}
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}
