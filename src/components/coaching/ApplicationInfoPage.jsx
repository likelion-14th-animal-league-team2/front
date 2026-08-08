import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  IconMapPin,
  IconBuilding,
  IconDocument,
  IconFolderUpload,
  IconArrowLeft,
  IconArrowRight,
} from "../../components/common/icons";
import { PATH } from "../../routes/paths";

const MAX_DESCRIPTION_LENGTH = 2000;

function ApplicationInfoPage() {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    country: "",
    city: "",
    companyName: "",
    jobTitle: "",
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

  const handleStartCoaching = () => {
    console.log({ ...form, screenshotFile });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* 상단 브레드크럼 + 메인으로 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>이력서 제출</span>
          <span>&gt;</span>
          <span className="text-slate-700 font-medium">지원 정보 입력</span>
          <span>&gt;</span>
          <span>AI 코칭 받기</span>
        </div>
        <Link
          to={PATH.MAIN}
          className="text-xs text-[#1E2A47] font-medium hover:underline"
        >
          ← 메인으로
        </Link>
      </div>

      <h1 className="text-xl font-bold text-slate-900 mb-1">지원 정보 입력</h1>
      <p className="text-sm text-slate-500 mb-6">
        지원할 국가와 기업 정보를 입력하면 AI 코칭의 정확도가 올라가요.
      </p>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* 지원 국가 */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <IconMapPin className="text-[#1E2A47]" />
            <h2 className="text-sm font-semibold text-slate-900">지원 국가</h2>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            지원하려는 국가를 입력해 주세요. 맞춤형 코칭에 반영됩니다.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                국가명 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.country}
                onChange={handleChange("country")}
                placeholder="예) 대한민국"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E2A47]"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">도시 (선택)</label>
              <input
                type="text"
                value={form.city}
                onChange={handleChange("city")}
                placeholder="예) 서울특별시"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E2A47]"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            국가별 트렌드와 채용 관행이 AI 코칭에 반영돼요.
          </p>
        </div>

        <hr className="border-slate-100" />

        {/* 기업 기본 정보 */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <IconBuilding className="text-[#1E2A47]" />
            <h2 className="text-sm font-semibold text-slate-900">기업 기본 정보</h2>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            공고에 표시된 기업 정보를 정확히 입력해 주세요.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                기업명 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.companyName}
                onChange={handleChange("companyName")}
                placeholder="예) 네이버 주식회사"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E2A47]"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                공고 제목 <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.jobTitle}
                onChange={handleChange("jobTitle")}
                placeholder="예) 2026 상반기 UI/UX 디자이너 채용"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E2A47]"
              />
            </div>
          </div>
        </div>

        {/* 공고 본문 */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <IconDocument className="text-[#1E2A47]" />
            <h2 className="text-sm font-semibold text-slate-900">공고 본문</h2>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            공고의 주요 내용을 붙여넣으면 AI 분석에 활용돼요.
          </p>
          <textarea
            value={form.jobDescription}
            onChange={handleChange("jobDescription")}
            maxLength={MAX_DESCRIPTION_LENGTH}
            rows={5}
            placeholder="예) 주요 업무, 지원 자격, 근무 조건, 채용 절차 등 공고 내용을 붙여넣어 주세요."
            className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1E2A47] resize-none"
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-[11px] text-slate-400">
              전체 공고문을 붙여넣을수록 정확도가 정확해져요.
            </p>
            <p className="text-[11px] text-slate-400">
              {form.jobDescription.length}자
            </p>
          </div>
        </div>

        {/* 공고 스크린샷 업로드 */}
        <div>
          <h2 className="text-sm font-semibold text-slate-900 mb-1">
            공고 스크린샷 업로드
          </h2>
          <p className="text-xs text-slate-400 mb-3">
            공고 캡처본을 첨부하면 텍스트를 자동으로 추출해드려요.
          </p>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-slate-200 rounded-xl py-8 flex flex-col items-center justify-center gap-3"
          >
            <IconFolderUpload />
            <div className="text-center">
              <p className="text-sm text-slate-600 font-medium">
                {screenshotFile ? screenshotFile.name : "공고 캡처본을 끌어다 놓거나"}
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
        </div>
      </div>

      {/* 하단 안내 + 버튼 */}
      <div className="flex items-center justify-between mt-5">
        <p className="text-xs text-slate-400">
          ✓ 입력하신 정보는 AI 분석에만 활용됩니다.
        </p>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 border border-slate-200 text-slate-600 text-sm font-medium rounded-lg px-4 py-2 hover:bg-slate-50">
            <IconArrowLeft />
            이전 단계
          </button>
          <button
            onClick={handleStartCoaching}
            className="flex items-center gap-1.5 bg-[#1E2A47] text-white text-sm font-semibold rounded-lg px-4 py-2 hover:bg-[#16203A] transition-colors"
          >
            AI 코칭 시작
            <IconArrowRight />
          </button>
        </div>
      </div>

      <footer className="text-center text-xs text-slate-300 py-8">
        © 2026 레주밍
      </footer>
    </div>
  );
}

export default ApplicationInfoPage;
