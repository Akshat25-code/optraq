import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, X } from 'lucide-react';

export const Toast = ({ toast }) => (
    <AnimatePresence>
        {toast && (
            <motion.div
                role="status"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-8 right-8 z-[70] flex items-center gap-3 rounded-[12px] border border-white/10 bg-[rgba(17,16,15,.85)] px-5 py-3.5 text-sm text-white shadow-2xl backdrop-blur-[30px]"
            >
                {toast.type === 'success'
                    ? <Check className="h-4 w-4 text-[#3ECF8E]" aria-hidden="true" />
                    : <X className="h-4 w-4 text-[#E2607A]" aria-hidden="true" />}
                {toast.message}
            </motion.div>
        )}
    </AnimatePresence>
);

export const ProgressBar = ({ progressStep }) => (
    <AnimatePresence>
        {progressStep && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed top-16 left-1/2 -translate-x-1/2 z-40"
            >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-white shadow-md border border-white/10 bg-[rgba(17,16,15,.85)] backdrop-blur-[30px]">
                    <Loader2 className="h-4 w-4 animate-spin text-white" aria-hidden="true" />
                    {progressStep === 'validating' && 'Validating input...'}
                    {progressStep === 'connecting' && 'Connecting to AI...'}
                    {progressStep === 'processing' && 'AI is thinking...'}
                    {progressStep === 'rendering' && 'Rendering results...'}
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);

