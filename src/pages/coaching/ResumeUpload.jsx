import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoachingBreadcrumb from "../../components/coaching/CoachingBreadcrumb";
import {
  IconDocument,
  IconImage,
  IconInfo,
  IconFolderUpload,
  IconUpload,
  IconCircleCheck,
  IconArrowRight,
  IconX,
} from "../../components/common/icons";
import { PATH } from "../../routes/paths";
import { useCoachingDraftStore } from "../../store/useCoachingDraftStore";

const MIN_TEXT_LENGTH = 200;

function ResumeUpload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [resumeText, setResumeText] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const setResumeDraft = useCoachingDraftStore((state) => state.setResumeDraft);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setResumeFile(file);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setResumeFile(file);
  };

  const canStart = resumeText.trim().length > 0 || Boolean(resumeFile);

  const handleStartCoaching = () => {
    setResumeDraft({ resumeText, resumeImage: resumeFile });
    navigate(PATH.APPLICATION_INFO);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <CoachingBreadcrumb current="resume" />

      <h1 className="text-xl font-bold text-slate-900 mb-1">새 이력서 업로드</h1>
      <p className="text-sm text-slate-500 mb-6">
        파일을 올리면 레주밍이 바로 첨삭 포인트를 분석해드려요.
      </p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* 텍스트 업로드 */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#1E2A47]/5 flex items-center justify-center text-[#1E2A47]">
              <IconDocument />
            </div>
            <h2 className="text-sm font-semibold text-slate-900">텍스트 업로드</h2>
          </div>
          <p className="text-xs text-slate-400 mb-3 ml-10">
            이력서 내용을 복사해서 붙여넣어 주세요.
          </p>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={7}
            placeholder="예) 지원동기, 프로젝트 경험, 직무 관련 역량을 자유롭게 작성해 주세요."
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1E2A47] resize-none bg-slate-50/50"
          />
          <div className="flex items-center justify-between mt-1.5">
            <p className="flex items-center gap-1 text-[11px] text-slate-400">
              <IconInfo />
              최소 {MIN_TEXT_LENGTH}자 이상 권장
            </p>
            <p className="text-[11px] text-slate-400">{resumeText.length}자</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <hr className="flex-1 border-slate-200" />
          <span className="text-xs font-bold text-slate-400">또는</span>
          <hr className="flex-1 border-slate-200" />
        </div>

        {/* 이미지 업로드 */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#1E2A47]/5 flex items-center justify-center text-[#1E2A47]">
              <IconImage />
            </div>
            <h2 className="text-sm font-semibold text-slate-900">이미지 업로드</h2>
          </div>
          <p className="text-xs text-slate-400 mb-3 ml-10">
            이력서 캡처본이나 PDF를 첨부하면 텍스트를 추출해드려요.
          </p>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-[#1E2A47]/20 bg-[#1E2A47]/2 rounded-xl py-8 flex flex-col items-center justify-center gap-3"
          >
            <IconFolderUpload />
            <div className="text-center">
              <p className="text-sm text-slate-600 font-medium">파일을 끌어다 놓거나</p>
              <p className="text-xs text-slate-400 mt-0.5">PDF, JPG, PNG (최대 10MB)</p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-1.5 bg-[#1E2A47] text-white text-xs font-medium rounded-lg px-4 py-2 hover:bg-[#16203A] transition-colors"
            >
              <IconUpload />
              이미지 업로드
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              hidden
              onChange={handleFileSelect}
            />
          </div>

          {resumeFile && (
            <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 mt-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1E2A47] flex items-center justify-center text-white shrink-0">
                  <IconImage width="14" height="14" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{resumeFile.name}</p>
                  <p className="text-xs text-slate-400">
                    {(resumeFile.size / 1024 / 1024).toFixed(1)}MB · 텍스트 추출 완료
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap">
                  추출됨
                </span>
                <button
                  type="button"
                  onClick={() => setResumeFile(null)}
                  aria-label="첨부 파일 삭제"
                  className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
                >
                  <IconX />
                </button>
              </div>
            </div>
          )}
        </div>

        <hr className="border-slate-100" />

        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="flex items-center gap-1.5 text-xs text-slate-500">
            <IconCircleCheck className="text-slate-400" />
            첨부한 파일은 안전하게 처리됩니다.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleStartCoaching}
              disabled={!canStart}
              className="flex items-center gap-1.5 bg-[#1E2A47] text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-[#16203A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              AI 코칭 시작
              <IconArrowRight />
            </button>
          </div>
        </div>
      </div>

      <footer className="text-center text-xs text-slate-300 py-8">© 2026 레주밍</footer>
    </div>
  );
}

export default ResumeUpload;
