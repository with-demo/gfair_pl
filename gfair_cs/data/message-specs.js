window.GFAIR_MESSAGE_SPECS=[
{"key":"jnl16-review-result","title":"수출상담일지 상세 승인·반려 처리","trigger":"관리자 또는 수출상담 운영용역사가 승인 요청 일지의 승인·반려 클릭","message":"검토용 일지를 승인 완료 상태로 변경했습니다. / 검토용 일지를 반려 상태로 변경했습니다.","confirm":"목록 상태와 상세 처리 이력을 갱신하고 승인·반려 버튼을 비활성화","cancel":"","screens":["JNL-16"],"type":"토스트","source":"js/app.js"},
{"key":"jnl16-reject-reason-required","title":"상세 반려 사유 필수","trigger":"반려 사유가 비어 있거나 공백만 입력한 상태에서 반려 클릭","message":"반려 사유를 입력해 주세요.","confirm":"입력란에 포커스하고 상태를 유지","cancel":"","screens":["JNL-16"],"type":"토스트","source":"js/app.js"},
{"key":"jnl14-bulk-request","title":"상담일지 일괄 승인 요청","trigger":"통역원이 임시 저장·반려 일지를 선택하고 승인 요청 클릭","message":"선택한 N건을 승인 요청하시겠습니까?","confirm":"승인 요청: 선택 일지를 승인 요청 상태로 변경하고 목록 갱신","cancel":"취소·닫기: 상태 변경 없이 목록 유지","screens":["JNL-14"],"type":"컨펌","source":"include/jnl14-bulk.js"},
{"key":"jnl14-bulk-approve","title":"상담일지 일괄 승인","trigger":"관리자 또는 수출상담 운영용역사가 승인 요청 상태의 일지를 선택하고 승인 클릭","message":"선택한 N건을 승인하시겠습니까?","confirm":"승인: 선택 일지를 승인 완료 상태로 변경하고 목록 갱신","cancel":"취소·닫기: 상태 변경 없이 목록 유지","screens":["JNL-14"],"type":"컨펌","source":"include/jnl14-bulk.js"},
{"key":"jnl14-bulk-reject","title":"공통 사유로 상담일지 일괄 반려","trigger":"관리자 또는 수출상담 운영용역사가 승인 요청 상태의 일지를 선택하고 반려 클릭","message":"선택한 N건을 반려하시겠습니까? / 공통 반려 사유 필수 입력","confirm":"반려: 동일한 사유를 선택한 모든 일지에 저장하고 반려 상태로 변경","cancel":"취소·닫기: 입력한 사유와 상태 변경을 적용하지 않음","screens":["JNL-14"],"type":"컨펌","source":"include/jnl14-bulk.js"},
{"key":"jnl14-reject-empty","title":"공통 반려 사유 미입력","trigger":"공통 반려 사유가 없거나 공백만 입력하고 반려 실행","message":"반려 사유를 입력해 주세요.","confirm":"팝업 유지·사유 입력란에 포커스, 일지 상태 유지","cancel":"","screens":["JNL-14"],"type":"인라인 오류","source":"include/jnl14-bulk.js"},
{"key":"admin-id-check-empty","title":"중복확인 아이디 미입력","trigger":"등록 아이디가 빈 값인 상태에서 중복확인 클릭","message":"아이디를 입력해 주세요.","confirm":"아이디 입력란 옆 안내 / 입력 화면 유지","screens":["BAS-18"],"type":"인라인 오류","cancel":"","source":"include/management-ui.js"},
{"key":"admin-id-check-result","title":"아이디 중복확인 결과","trigger":"등록 화면에서 중복확인 클릭","message":"이미 등록된 아이디입니다. / 사용 가능한 아이디입니다.","confirm":"아이디 입력란 옆 결과 표시 / 사용 가능하면 확인 상태 저장","screens":["BAS-18"],"type":"인라인 오류","cancel":"","source":"include/management-ui.js"},
{"key":"admin-id-unchecked","title":"아이디 중복확인 필요","trigger":"중복확인 미완료 또는 확인 후 아이디 변경 상태로 등록 클릭","message":"아이디 중복확인을 진행해 주세요.","confirm":"등록 중단 후 현재 입력 화면 유지","screens":["BAS-18"],"type":"인라인 오류","cancel":"","source":"include/management-ui.js"},
{"key":"admin-password-confirm","title":"비밀번호 확인 불일치","trigger":"등록 시 비밀번호와 비밀번호 확인 값 불일치","message":"비밀번호와 비밀번호 확인이 일치하지 않습니다.","confirm":"등록 중단 후 현재 입력 화면 유지","screens":["BAS-18"],"type":"인라인 오류","cancel":"","source":"include/management-ui.js"},
{"key":"admin-contact-phone","title":"관리자 전화번호 형식","message":"전화번호는 가운데 3~4자리, 마지막 4자리로 입력해 주세요.","trigger":"전화번호를 일부만 입력하거나 가운데·마지막 번호 자릿수 오류","screens":["BAS-18"],"type":"인라인 오류","confirm":"저장 중단 후 현재 입력 화면 유지","cancel":"","source":"include/management-ui.js"},
{"key":"admin-contact-mobile","title":"관리자 휴대전화번호 형식","message":"휴대전화번호를 4자리씩 입력해 주세요.","trigger":"휴대전화번호를 일부만 입력하거나 가운데·마지막 번호 자릿수 오류","screens":["BAS-18"],"type":"인라인 오류","confirm":"저장 중단 후 현재 입력 화면 유지","cancel":"","source":"include/management-ui.js"},
{"key":"admin-contact-email","title":"관리자 이메일 형식","message":"이메일 아이디와 도메인을 올바르게 입력해 주세요.","trigger":"이메일 아이디·도메인 일부 누락 또는 이메일 형식 오류","screens":["BAS-18"],"type":"인라인 오류","confirm":"저장 중단 후 현재 입력 화면 유지","cancel":"","source":"include/management-ui.js"},
{"key":"admin-password-required","screens":["BAS-18"],"type":"인라인 오류","trigger":"등록 시 비밀번호가 공백이거나 상세에서 공백만 입력하여 비밀번호 변경 시도","message":"비밀번호를 입력해 주세요. / 비밀번호는 공백만 입력할 수 없습니다.","confirm":"저장을 중단하고 현재 입력 화면 유지","cancel":"해당 없음","source":"include/management-ui.js","title":"관리자 비밀번호 입력 확인"},
  {
    "key": "notice-cancel",
    "screens": [
      "NTC-01",
      "NTC-04"
    ],
    "type": "컨펌",
    "trigger": "공지 등록·수정 화면에서 취소 선택",
    "message": "입력을 취소하고 이전 화면으로 돌아갈까요?",
    "confirm": "등록 취소는 목록으로, 수정 취소는 상세 화면으로 복귀",
    "cancel": "현재 입력 화면 유지",
    "source": "include/notice-ui.js",
    "title": "입력 취소 확인"
  },
  {
    "key": "notice-required",
    "screens": [
      "NTC-01",
      "NTC-04"
    ],
    "type": "알럿",
    "trigger": "저장 시 제목 또는 본문이 공백",
    "message": "제목과 내용을 입력해 주세요.",
    "confirm": "저장 중단 후 현재 입력 화면 유지",
    "cancel": "",
    "source": "include/notice-ui.js",
    "title": "제목·내용 미입력"
  },
  {
    "key": "notice-file",
    "screens": [
      "NTC-01",
      "NTC-04"
    ],
    "type": "알럿",
    "trigger": "첨부가 10MB 초과 또는 허용하지 않은 확장자",
    "message": "허용 확장자의 10MB 이하 파일 1개를 선택해 주세요.",
    "confirm": "선택한 파일 입력을 비우고 재선택 대기",
    "cancel": "",
    "source": "include/notice-ui.js",
    "title": "첨부파일 조건 오류"
  },
  {
    "key": "logout",
    "screens": [
      "*"
    ],
    "type": "레이어 컨펌",
    "trigger": "공통 GNB 로그아웃 선택",
    "message": "초안 없음: 검토용 화면에서 로그아웃할까요?\n초안 있음: 이 기기에 저장된 검토용 초안이 정리됩니다.",
    "confirm": "기기 초안을 정리하고 관리자 로그인 화면으로 이동",
    "cancel": "현재 화면 유지",
    "source": "js/app.js",
    "title": "로그아웃 확인"
  },
  {
    "key": "send",
    "screens": [
      "NTC-05"
    ],
    "type": "레이어 컨펌",
    "trigger": "발송 선택",
    "message": "대상과 내용을 확인합니다. 실제 SMS는 발송하지 않습니다.",
    "confirm": "검토 완료 시 발송 검토 이력을 남김; 실제 SMS 미발송",
    "cancel": "발송 검토 중단",
    "source": "js/app.js",
    "title": "발송 대상 확인"
  },
  {
    "key": "send-result",
    "screens": [
      "NTC-05"
    ],
    "type": "토스트",
    "trigger": "발송 대상 확인에서 검토 완료 선택",
    "message": "검토를 완료했습니다. 실제 SMS는 발송하지 않았습니다.",
    "confirm": "안내 후 현재 화면 유지",
    "cancel": "",
    "source": "js/app.js",
    "title": "발송 검토 완료"
  },
  {
    "key": "accept",
    "screens": [
      "PRE-07"
    ],
    "type": "레이어 컨펌",
    "trigger": "통역 요청 수락 선택",
    "message": "현재 담당 일정과 중복되지 않는지 확인해 주세요.\n최종 매칭은 운영 담당자가 확정합니다.",
    "confirm": "수락 확인 이력을 남기고 담당 일정 화면으로 이동",
    "cancel": "기존 상태 유지",
    "source": "js/app.js",
    "title": "통역 요청 수락 확인"
  },
  {
    "key": "review-permission",
    "screens": [
      "JNL-02",
      "JNL-BUY",
      "JNL-EXP"
    ],
    "type": "토스트",
    "trigger": "승인·반려 권한이 없는 사용자가 처리 시도",
    "message": "승인·반려 권한이 없습니다.",
    "confirm": "상태 변경 중단",
    "cancel": "",
    "source": "js/app.js",
    "title": "검수 권한 없음"
  },
  {
    "key": "review-stale",
    "screens": [
      "JNL-02",
      "JNL-BUY",
      "JNL-EXP"
    ],
    "type": "토스트",
    "trigger": "승인 요청 상태가 아닌 일지를 검수 처리",
    "message": "최신 처리 상태를 다시 확인해 주세요.",
    "confirm": "기존 처리 상태 유지",
    "cancel": "",
    "source": "js/app.js",
    "title": "검수 상태 변경됨"
  },
  {
    "key": "review-reason",
    "screens": [
      "JNL-02",
      "JNL-BUY",
      "JNL-EXP"
    ],
    "type": "토스트",
    "trigger": "반려사유 미입력 상태에서 반려 선택",
    "message": "반려 사유를 입력해 주세요.",
    "confirm": "반려사유 입력란에 포커스; 반려 처리 중단",
    "cancel": "",
    "source": "js/app.js",
    "title": "반려 사유 미입력"
  },
  {
    "key": "journal-offline",
    "screens": [
      "JNL-04",
      "JNL-05",
      "JNL-06"
    ],
    "type": "토스트",
    "trigger": "연결되지 않은 상태에서 상담일지 제출",
    "message": "오프라인입니다. 기기 초안은 저장했으며 제출할 수 없습니다.",
    "confirm": "기기 초안 유지; 제출 중단",
    "cancel": "",
    "source": "js/app.js",
    "title": "오프라인 제출 불가"
  },
  {
    "key": "journal-content",
    "screens": [
      "JNL-04",
      "JNL-05",
      "JNL-06"
    ],
    "type": "토스트",
    "trigger": "상담내용 없이 다음 단계 또는 제출 시도",
    "message": "상담내용을 먼저 작성해 주세요.",
    "confirm": "현재 작성 화면 유지",
    "cancel": "",
    "source": "js/app.js",
    "title": "상담내용 미입력"
  },
  {
    "key": "journal-company",
    "screens": [
      "JNL-04",
      "JNL-05",
      "JNL-06"
    ],
    "type": "토스트",
    "trigger": "상담기업 미선택 상태에서 진행",
    "message": "상담기업을 선택해 주세요.",
    "confirm": "상담기업 선택 대기",
    "cancel": "",
    "source": "js/app.js",
    "title": "상담기업 미선택"
  },
  {
    "key": "image-format",
    "screens": [
      "JNL-04",
      "JNL-05",
      "JNL-10"
    ],
    "type": "토스트",
    "trigger": "명함 첨부에 이미지가 아닌 파일 선택",
    "message": "이미지 파일을 선택해 주세요.",
    "confirm": "첨부 반영 중단",
    "cancel": "",
    "source": "js/app.js",
    "title": "이미지 형식 오류"
  },
  {
    "key": "camera-unavailable",
    "screens": [
      "COM-02",
      "JNL-03",
      "PRE-03"
    ],
    "type": "토스트",
    "trigger": "카메라 API를 사용할 수 없음",
    "message": "카메라를 사용할 수 없습니다. 코드 입력을 이용해 주세요.",
    "confirm": "직접 코드 입력으로 진행 가능",
    "cancel": "",
    "source": "js/app.js",
    "title": "카메라 사용 불가"
  },
  {
    "key": "camera-denied",
    "screens": [
      "COM-02",
      "JNL-03",
      "PRE-03"
    ],
    "type": "토스트",
    "trigger": "카메라 권한 또는 장치 접근 실패",
    "message": "카메라 권한을 확인하거나 코드 입력을 이용해 주세요.",
    "confirm": "스캔 중단; 직접 코드 입력 제공",
    "cancel": "",
    "source": "js/app.js",
    "title": "카메라 접근 실패"
  },
  {
    "key": "qr-invalid",
    "screens": [
      "COM-02",
      "JNL-03",
      "PRE-03"
    ],
    "type": "토스트",
    "trigger": "현재 행사와 QR 코드가 일치하지 않음",
    "message": "현재 행사와 QR 대상 코드를 확인해 주세요.",
    "confirm": "QR 확인 처리 중단",
    "cancel": "",
    "source": "js/app.js",
    "title": "QR 확인 오류"
  },
  {
    "key": "file-missing",
    "screens": [
      "BAS-12",
      "JNL-10",
      "JNL-11"
    ],
    "type": "토스트",
    "trigger": "검증할 파일을 선택하지 않음",
    "message": "파일을 먼저 선택해 주세요.",
    "confirm": "파일 선택 대기",
    "cancel": "",
    "source": "js/app.js",
    "title": "파일 미선택"
  },
  {
    "key": "file-validate-first",
    "screens": [
      "BAS-12",
      "JNL-11"
    ],
    "type": "토스트",
    "trigger": "파일 검증 전에 등록 선택",
    "message": "파일 검증을 먼저 진행해 주세요.",
    "confirm": "등록 중단",
    "cancel": "",
    "source": "js/app.js",
    "title": "파일 검증 필요"
  },
  {
    "key": "travel-target",
    "screens": [
      "PRE-02"
    ],
    "type": "토스트",
    "trigger": "이동상태 저장 시 대상 또는 상태가 유효하지 않음",
    "message": "대상과 이동상태를 확인해 주세요.",
    "confirm": "상태 변경 중단",
    "cancel": "",
    "source": "js/app.js",
    "title": "이동상태 입력 오류"
  },
  {
    "key": "travel-result",
    "screens": [
      "PRE-02"
    ],
    "type": "토스트",
    "trigger": "이동상태 변경 반영 완료",
    "message": "이동상태와 단계별 현황을 갱신했습니다.",
    "confirm": "목록과 현황에 변경 내용 반영",
    "cancel": "",
    "source": "js/app.js",
    "title": "이동상태 변경 완료"
  },
  {
    "key": "stats-year",
    "screens": [
      "STA-02",
      "STA-03"
    ],
    "type": "토스트",
    "trigger": "종료 연도가 시작 연도보다 이른 상태로 조회",
    "message": "종료 연도는 시작 연도보다 같거나 늦어야 합니다.",
    "confirm": "조회 중단; 연도 재입력",
    "cancel": "",
    "source": "js/app.js",
    "title": "조회 연도 오류"
  },
  {
    "key": "group-name",
    "screens": [
      "SET-01",
      "SET-02"
    ],
    "type": "인라인 오류",
    "trigger": "그룹명 공백 또는 기존 그룹명과 중복",
    "message": "공백: 그룹명을 입력해 주세요.\n중복: 같은 이름의 그룹이 있습니다.",
    "confirm": "저장 중단; 입력한 내용 유지",
    "cancel": "",
    "source": "include/group-access.js",
    "title": "그룹명 입력 오류"
  },
  {
    "key": "staff-scope",
    "screens": [
      "COM-08"
    ],
    "type": "인라인 오류",
    "trigger": "본인 회사에 배정되지 않은 행사로 등록 시도",
    "message": "본인 회사에 배정된 행사만 등록할 수 있습니다.",
    "confirm": "등록 중단",
    "cancel": "",
    "source": "include/management-ui.js",
    "title": "담당 행사 범위 오류"
  },
  {
    "key": "staff-required",
    "screens": [
      "COM-08"
    ],
    "type": "인라인 오류",
    "trigger": "담당자코드 또는 이름이 공백",
    "message": "담당자코드와 이름을 입력해 주세요.",
    "confirm": "등록 중단; 입력값 유지",
    "cancel": "",
    "source": "include/management-ui.js",
    "title": "담당자 필수 항목 누락"
  },
  {
    "key": "staff-duplicate",
    "screens": [
      "COM-08"
    ],
    "type": "인라인 오류",
    "trigger": "동일 회사·행사에 같은 담당자코드 존재",
    "message": "같은 행사에 이미 등록된 담당자코드입니다.",
    "confirm": "등록 중단; 코드 수정 대기",
    "cancel": "",
    "source": "include/management-ui.js",
    "title": "담당자코드 중복"
  },
  {
    "key": "admin-required",
    "screens": [
      "BAS-16",
      "BAS-18"
    ],
    "type": "인라인 오류",
    "trigger": "아이디 또는 이름이 공백",
    "message": "아이디와 이름은 공백만 입력할 수 없습니다.",
    "confirm": "저장 중단",
    "cancel": "",
    "source": "include/management-ui.js",
    "title": "관리자 필수 항목 누락"
  },
  {
    "key": "admin-duplicate",
    "screens": [
      "BAS-16",
      "BAS-18"
    ],
    "type": "인라인 오류",
    "trigger": "아이디가 기존 계정과 중복",
    "message": "이미 등록된 아이디입니다.",
    "confirm": "등록·수정 중단",
    "cancel": "",
    "source": "include/management-ui.js",
    "title": "아이디 중복"
  },
  {
    "key": "survey-delete",
    "screens": [
      "SET-05"
    ],
    "type": "레이어 컨펌",
    "trigger": "설문 목록에서 삭제 선택",
    "message": "{설문제목}을 삭제할까요?\n해당 설문의 응답도 함께 삭제됩니다.",
    "confirm": "삭제 확인 선택 시 설문과 응답을 목록에서 제거",
    "cancel": "설문·응답 유지",
    "source": "js/app.js",
    "title": "설문 삭제 확인"
  },
  {
    "key": "survey-date",
    "screens": [
      "SET-05"
    ],
    "type": "토스트",
    "trigger": "설문 종료일이 시작일보다 이른 상태로 저장",
    "message": "조사 종료일은 시작일 이후로 입력해주세요.",
    "confirm": "저장 중단; 입력값 유지",
    "cancel": "",
    "source": "js/app.js",
    "title": "조사기간 오류"
  },
  {
    "key": "survey-required",
    "screens": [
      "SET-05"
    ],
    "type": "토스트",
    "trigger": "설문제목·그룹명·질문·선택형 보기에 공백 존재",
    "message": "설문제목·그룹명·질문·보기 내용을 입력해주세요.",
    "confirm": "저장 중단; 누락 항목 보완",
    "cancel": "",
    "source": "js/app.js",
    "title": "설문 필수 항목 누락"
  },
  {
    "key": "survey-group",
    "screens": [
      "SET-05"
    ],
    "type": "토스트",
    "trigger": "그룹의 마지막 문항 삭제 시도",
    "message": "그룹에는 최소 한 문항이 필요합니다.",
    "confirm": "마지막 문항 유지",
    "cancel": "",
    "source": "js/app.js",
    "title": "마지막 문항 삭제 불가"
  },
  {
    "key": "survey-copy",
    "screens": [
      "SET-05"
    ],
    "type": "토스트",
    "trigger": "설문 복사 완료",
    "message": "설문을 복사했습니다.",
    "confirm": "응답이 없는 복사본을 생성하고 목록 갱신",
    "cancel": "",
    "source": "js/app.js",
    "title": "설문 복사 완료"
  },
  {
    "key": "response-date",
    "screens": [
      "SET-06"
    ],
    "type": "토스트",
    "trigger": "응답 조회 종료일이 시작일보다 이른 상태로 조회",
    "message": "응답 종료일은 시작일 이후로 선택해주세요.",
    "confirm": "응답 조회 중단",
    "cancel": "",
    "source": "js/app.js",
    "title": "응답 조회기간 오류"
  }
];
