import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoachingBreadcrumb from "../../components/coaching/CoachingBreadcrumb";
import {
  IconMapPin,
  IconBuilding,
  IconDocument,
  IconFolderUpload,
  IconUpload,
  IconImage,
  IconCircleCheck,
  IconArrowRight,
  IconX,
} from "../../components/common/icons";
import { PATH } from "../../routes/paths";
import { useCoachingDraftStore } from "../../store/useCoachingDraftStore";

const MAX_DESCRIPTION_LENGTH = 2000;

function ApplicationInfoPage() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const setApplicationDraft = useCoachingDraftStore((state) => state.setApplicationDraft);

  const [form, setForm] = useState({
    country: "",
    companyName: "",
    jobDescription: "",
  });
  const [screenshotFile, setScreenshotFile] = useState(null);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setScreenshotFile(file);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setScreenshotFile(file);
  };

  const canStart = Boolean(screenshotFile);

  const handleStartCoaching = () => {
    if (!canStart) return;
    setApplicationDraft({
      jobText: form.jobDescription,
      jobImage: screenshotFile,
      targetCountry: form.country,
      targetCompany: form.companyName,
    });
    navigate(PATH.COACHING_LOADING);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <CoachingBreadcrumb current="info" />
      <h1 className="text-xl font-bold text-slate-900 mb-1">지원 정보 입력</h1>
      <p className="text-sm text-slate-500 mb-6">
        지원할 국가와 기업 정보를 입력하면 AI 코칭의 정확도가 올라가요.
      </p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* 지원 국가 */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#1E2A47]/5 flex items-center justify-center text-[#1E2A47]">
              <IconMapPin />
            </div>
            <h2 className="text-sm font-semibold text-slate-900">지원 국가</h2>
          </div>
          <p className="text-xs text-slate-400 mb-3 ml-10">
            지원하려는 국가를 입력해 주세요. 맞춤형 코칭에 반영됩니다.
          </p>
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              국가명 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.country}
              onChange={handleChange("country")}
              placeholder="예) 대한민국"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E2A47] bg-slate-50/50"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            국가별 트렌드와 채용 관행이 AI 코칭에 반영돼요.
          </p>
        </div>

        <hr className="border-slate-100" />

        {/* 기업 기본 정보 */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#1E2A47]/5 flex items-center justify-center text-[#1E2A47]">
              <IconBuilding />
            </div>
            <h2 className="text-sm font-semibold text-slate-900">기업 기본 정보</h2>
          </div>
          <p className="text-xs text-slate-400 mb-3 ml-10">
            공고에 표시된 기업 정보를 정확히 입력해 주세요.
          </p>
          <div>
            <label className="block text-xs text-slate-500 mb-1">
              기업명 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={form.companyName}
              onChange={handleChange("companyName")}
              placeholder="예) 네이버 주식회사"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E2A47] bg-slate-50/50"
            />
          </div>
        </div>

        {/* 공고 본문 */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#1E2A47]/5 flex items-center justify-center text-[#1E2A47]">
              <IconDocument />
            </div>
            <h2 className="text-sm font-semibold text-slate-900">공고 본문</h2>
          </div>
          <p className="text-xs text-slate-400 mb-3 ml-10">
            공고의 주요 내용을 붙여넣으면 AI 분석에 활용돼요.
          </p>
          <textarea
            value={form.jobDescription}
            onChange={handleChange("jobDescription")}
            maxLength={MAX_DESCRIPTION_LENGTH}
            rows={5}
            placeholder="예) 주요 업무, 지원 자격, 근무 조건, 채용 절차 등 공고 내용을 붙여넣어 주세요."
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1E2A47] resize-none bg-slate-50/50"
          />
          <div className="flex items-center justify-between mt-1.5">
            <p className="text-[11px] text-slate-400">
              전체 공고문을 붙여넣을수록 정확도가 정확해져요.
            </p>
            <p className="text-[11px] text-slate-400">
              {form.jobDescription.length}자
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <hr className="flex-1 border-slate-200" />
          <span className="text-xs font-bold text-slate-400">공고 스크린샷</span>
          <hr className="flex-1 border-slate-200" />
        </div>

        {/* 공고 스크린샷 업로드 */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#1E2A47]/5 flex items-center justify-center text-[#1E2A47]">
              <IconImage />
            </div>
            <h2 className="text-sm font-semibold text-slate-900">
              공고 스크린샷 업로드 <span className="text-red-400">*</span>
            </h2>
          </div>
          <p className="text-xs text-slate-400 mb-3 ml-10">
            공고 캡처본을 첨부하면 텍스트를 자동으로 추출해드려요.
          </p>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-[#1E2A47]/20 bg-[#1E2A47]/2 rounded-xl py-8 flex flex-col items-center justify-center gap-3"
          >
            <IconFolderUpload />
            <div className="text-center">
              <p className="text-sm text-slate-600 font-medium">
                공고 캡처본을 끌어다 놓거나
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                PDF, JPG, PNG (최대 10MB)
              </p>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="flex items-center gap-1.5 bg-[#1E2A47] text-white text-xs font-medium rounded-lg px-4 py-2 hover:bg-[#16203A] transition-colors"
            >
              <IconUpload />
              스크린샷 업로드
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              hidden
              onChange={handleFileSelect}
            />
          </div>

          {screenshotFile && (
            <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-3 mt-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1E2A47] flex items-center justify-center text-white shrink-0">
                  <IconImage width="14" height="14" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{screenshotFile.name}</p>
                  <p className="text-xs text-slate-400">
                    {(screenshotFile.size / 1024 / 1024).toFixed(1)}MB · 텍스트 추출 완료
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap">
                  추출됨
                </span>
                <button
                  type="button"
                  onClick={() => setScreenshotFile(null)}
                  aria-label="첨부 파일 삭제"
                  className="w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
                >
                  <IconX />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 하단 안내 + 버튼 */}
      <div className="flex items-center justify-between flex-wrap gap-3 mt-5">
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <IconCircleCheck className="text-slate-400" />
          입력하신 정보는 AI 분석에만 활용됩니다.
        </p>
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

      <footer className="text-center text-xs text-slate-300 py-8">
        © 2026 레주밍
      </footer>
    </div>
  );
}

export default ApplicationInfoPage;
