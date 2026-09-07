import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Check, X, Link, Sparkles, AlertCircle } from 'lucide-react';

interface ImageDropzoneProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accentColor?: 'cyan' | 'pink';
  helperText?: string;
}

export const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  value,
  onChange,
  label = 'ფოტოს ატვირთვა / ჩაგდება (Drag & Drop)',
  accentColor = 'cyan',
  helperText = 'ჩააგდეთ ფოტო აქ, ჩასვით ლინკი ან დააკოპირეთ (Ctrl+V)'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [pasteSuccess, setPasteSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isPink = accentColor === 'pink';
  const themeBorder = isPink ? 'border-pink-500' : 'border-[#00e5ff]';
  const themeText = isPink ? 'text-pink-400' : 'text-[#00e5ff]';
  const themeBg = isPink ? 'bg-pink-500/10' : 'bg-[#00e5ff]/10';

  const [isCompressing, setIsCompressing] = useState(false);

  const compressAndProcessFile = (file: File) => {
    setErrorMessage('');
    if (!file.type.startsWith('image/')) {
      setErrorMessage('გთხოვთ აირჩიოთ მხოლოდ სურათის ფაილი (JPG, PNG, WEBP, GIF).');
      return;
    }

    setIsCompressing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 700;

          if (width > height) {
            if (width > MAX_SIZE) {
              height = Math.round((height * MAX_SIZE) / width);
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width = Math.round((width * MAX_SIZE) / height);
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            // Export optimized JPEG data URL (quality 0.72)
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.72);
            onChange(compressedDataUrl);
            triggerSuccess();
          } else {
            // Fallback to raw string
            onChange(event.target?.result as string);
            triggerSuccess();
          }
        } catch (err) {
          console.error('Image compression error:', err);
          onChange(event.target?.result as string);
          triggerSuccess();
        } finally {
          setIsCompressing(false);
        }
      };
      img.onerror = () => {
        setIsCompressing(false);
        setErrorMessage('ფოტოს დამუშავება ვერ მოხერხდა.');
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      setIsCompressing(false);
      setErrorMessage('ფაილის წაკითხვა ვერ მოხერხდა.');
    };
    reader.readAsDataURL(file);
  };

  const processFile = (file: File) => {
    compressAndProcessFile(file);
  };

  const processDataTransfer = (dt: DataTransfer) => {
    setErrorMessage('');
    // 1. Local dropped files
    if (dt.files && dt.files.length > 0) {
      processFile(dt.files[0]);
      return;
    }

    // 2. Dragged URL / HTML image from another website (e.g. Instagram, Google Images)
    const uriList = dt.getData('text/uri-list');
    if (uriList && (uriList.startsWith('http://') || uriList.startsWith('https://') || uriList.startsWith('data:image/'))) {
      onChange(uriList.trim());
      triggerSuccess();
      return;
    }

    // 3. HTML fragment dragged from browser
    const htmlData = dt.getData('text/html');
    if (htmlData) {
      const match = htmlData.match(/src=["'](https?:\/\/[^"']+|data:image\/[^"']+)["']/i);
      if (match && match[1]) {
        onChange(match[1]);
        triggerSuccess();
        return;
      }
    }

    // 4. Plain text URL
    const plainText = dt.getData('text/plain');
    if (plainText && (plainText.trim().startsWith('http://') || plainText.trim().startsWith('https://') || plainText.trim().startsWith('data:image/'))) {
      onChange(plainText.trim());
      triggerSuccess();
      return;
    }

    setErrorMessage('ვერ მოიძებნა ვალიდური ფოტო ან სურათის ლინკი.');
  };

  const triggerSuccess = () => {
    setPasteSuccess(true);
    setTimeout(() => setPasteSuccess(false), 2500);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer) {
      processDataTransfer(e.dataTransfer);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    if (e.clipboardData) {
      processDataTransfer(e.clipboardData);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold text-slate-300 flex items-center space-x-2">
          <ImageIcon className={`w-3.5 h-3.5 ${themeText}`} />
          <span>{label}</span>
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className={`text-[11px] font-mono hover:underline flex items-center space-x-1 ${themeText}`}
        >
          <Link className="w-3 h-3" />
          <span>{showUrlInput ? 'ჩამალვა' : 'URL ლინკი'}</span>
        </button>
      </div>

      {/* Main Drag and Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onPaste={handlePaste}
        tabIndex={0}
        className={`relative rounded-2xl border-2 border-dashed p-4 transition-all duration-300 outline-none cursor-pointer group ${
          isDragging
            ? `${themeBorder} ${themeBg} scale-[1.01] shadow-xl shadow-cyan-500/10`
            : value
            ? 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
            : 'border-slate-800 bg-slate-950/80 hover:border-slate-700 hover:bg-slate-900/60'
        }`}
      >
        <input
          type="file"
          accept="image/*"
          id={`dropzone-file-${label.replace(/\s+/g, '-')}`}
          className="hidden"
          onChange={handleFileInputChange}
        />

        {value ? (
          /* Preview Mode with Replace Options */
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative group/img shrink-0">
              <img
                src={value}
                alt="Uploaded Jersey"
                className="w-20 h-20 rounded-xl object-cover border border-slate-700 bg-black shadow-md"
                referrerPolicy="no-referrer"
                onError={() => setErrorMessage('ფოტო ვერ ჩაიტვირთა. გთხოვთ შეამოწმოთ სურათის ლინკი.')}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange('');
                }}
                className="absolute -top-2 -right-2 p-1 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-500 transition"
                title="წაშლა"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-1.5">
              <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-emerald-400 text-xs font-bold">
                <Check className="w-4 h-4" />
                <span>ფოტო არჩეულია!</span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono truncate max-w-xs">
                {value.startsWith('data:') ? 'Base64 სურათის ფაილი' : value}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                <label
                  htmlFor={`dropzone-file-${label.replace(/\s+/g, '-')}`}
                  className={`cursor-pointer px-3 py-1.5 rounded-lg text-[11px] font-bold border transition flex items-center space-x-1 ${
                    isPink
                      ? 'bg-pink-500/10 border-pink-500/40 text-pink-300 hover:bg-pink-500/20'
                      : 'bg-[#00e5ff]/10 border-[#00e5ff]/40 text-[#00e5ff] hover:bg-[#00e5ff]/20'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Upload className="w-3 h-3" />
                  <span>შეცვლა / ატვირთვა</span>
                </label>
                <span className="text-[10px] text-slate-500 font-mono">ან ჩააგდეთ ახალი ფოტო</span>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Drop Zone */
          <label
            htmlFor={`dropzone-file-${label.replace(/\s+/g, '-')}`}
            className="flex flex-col items-center justify-center text-center space-y-2 py-3 cursor-pointer"
          >
            <div className={`p-3 rounded-2xl transition duration-300 ${
              isDragging ? `${themeBg} scale-110` : 'bg-slate-900 group-hover:scale-105'
            }`}>
              <Upload className={`w-6 h-6 ${isDragging ? themeText : 'text-slate-400 group-hover:' + themeText}`} />
            </div>

            <div>
              <p className="text-xs font-bold text-white flex items-center justify-center space-x-1">
                <span>ჩააგდეთ ფოტო აქ</span>
                <span className={`text-[11px] font-normal ${themeText}`}>ან აირჩიეთ ფაილი</span>
              </p>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                {helperText}
              </p>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">
                Drag & Drop
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">
                Web Image Drag
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] text-slate-400 font-mono">
                Ctrl+V Paste
              </span>
            </div>
          </label>
        )}
      </div>

      {/* Manual URL Input drawer */}
      {showUrlInput && (
        <div className="pt-1">
          <input
            type="text"
            placeholder="ჩასვით სურათის პირდაპირი URL ლინკი (https://...)..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:${themeBorder}`}
          />
        </div>
      )}

      {/* Status Indicators */}
      {isCompressing && (
        <div className="flex items-center space-x-1.5 text-cyan-400 text-xs font-bold pt-0.5 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>ფოტოს ოპტიმიზაცია და ზომის შემცირება მიმდინარეობს...</span>
        </div>
      )}

      {pasteSuccess && !isCompressing && (
        <div className="flex items-center space-x-1.5 text-emerald-400 text-xs font-bold pt-0.5 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ფოტო წარმატებით ჩაიტვირთა!</span>
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center space-x-1.5 text-red-400 text-xs font-bold pt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
