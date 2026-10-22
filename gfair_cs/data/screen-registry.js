// 현재 구현된 보조 화면의 정식 ID와 진입 정보를 관리한다.
window.GFAIR_SCREEN_REGISTRY=[
  {
    "id": "SET-07",
    "title": "만족도설문 관리",
    "parent": "SET-05",
    "summary": "만족도설문 관리 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "list",
    "source": "SET-05",
    "alias": "SURVEY-HOME"
  },
  {
    "id": "SET-08",
    "title": "그룹 등록",
    "parent": "SET-01",
    "summary": "그룹 등록 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "그룹 등록",
    "selector": "[data-group-action=create]",
    "contains": false
  },
  {
    "id": "SET-11",
    "title": "설문 등록",
    "parent": "SET-05",
    "summary": "설문 등록 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "설문 등록",
    "selector": "[data-action=sur-create]",
    "contains": false
  },
  {
    "id": "SET-12",
    "title": "설문 수정",
    "parent": "SET-05",
    "summary": "설문 수정 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "설문 수정",
    "selector": "[data-action=sur-edit]",
    "contains": false
  },
  {
    "id": "SET-13",
    "title": "설문 미리보기",
    "parent": "SET-05",
    "summary": "설문 미리보기 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "설문 미리보기",
    "selector": "[data-action=sur-preview]",
    "contains": false
  },
  {
    "id": "SET-14",
    "title": "개별 설문 응답",
    "parent": "SET-06",
    "summary": "개별 설문 응답 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "개별 설문 응답",
    "selector": "[data-action=sur-individual]",
    "contains": false
  },
  {
    "id": "SET-15",
    "title": "주관식 설문 응답",
    "parent": "SET-06",
    "summary": "주관식 설문 응답 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "주관식 응답",
    "selector": "[data-action=sur-text-results]",
    "contains": false
  },
  {
    "id": "COM-09",
    "title": "내정보 조회",
    "parent": "MON-01",
    "summary": "내정보 조회 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "내정보",
    "selector": "[data-action=my-info]",
    "contains": false
  },
  {
    "id": "SET-16",
    "title": "설문 응답 결과 상세",
    "parent": "SET-06",
    "summary": "설문 응답 결과 상세 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "list",
    "source": "SET-06",
    "surveyResult": true
  },
  {
    "id": "NTC-10",
    "title": "FAQ 등록",
    "parent": "NTC-02",
    "summary": "FAQ 등록 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "list",
    "publicBoard": "faq",
    "boardView": "create"
  },
  {
    "id": "NTC-11",
    "title": "FAQ 수정",
    "parent": "NTC-02",
    "summary": "FAQ 수정 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "list",
    "publicBoard": "faq",
    "boardView": "edit"
  },
  {
    "id": "NTC-12",
    "title": "자료실 상세",
    "parent": "NTC-03",
    "summary": "자료실 상세 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "list",
    "publicBoard": "resource",
    "boardView": "detail"
  },
  {
    "id": "NTC-13",
    "title": "자료실 등록",
    "parent": "NTC-03",
    "summary": "자료실 등록 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "list",
    "publicBoard": "resource",
    "boardView": "create"
  },
  {
    "id": "NTC-14",
    "title": "자료실 수정",
    "parent": "NTC-03",
    "summary": "자료실 수정 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "list",
    "publicBoard": "resource",
    "boardView": "edit"
  },
  {
    "id": "NTC-15",
    "title": "공지사항 등록",
    "parent": "NTC-01",
    "summary": "공지사항 등록 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "list",
    "noticeMode": "create"
  },
  {
    "id": "NTC-16",
    "title": "공지사항 수정",
    "parent": "NTC-01",
    "summary": "공지사항 수정 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "list",
    "noticeMode": "edit"
  },
  {
    "id": "BAS-21",
    "title": "홈페이지 연계현황·오류 점검 상세",
    "parent": "BAS-13",
    "summary": "홈페이지 연계현황·오류 점검 상세 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "상세 정보",
    "selector": "[data-action=row]"
  },
  {
    "id": "PRE-10",
    "title": "국내바이어 사전교육 관리 상세",
    "parent": "PRE-09",
    "summary": "국내바이어 사전교육 관리 상세 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "상세 정보",
    "selector": "[data-action=row]"
  },
  {
    "id": "MON-09",
    "title": "국내바이어 출석 관리 상세",
    "parent": "MON-05",
    "summary": "국내바이어 출석 관리 상세 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "상세 정보",
    "selector": "[data-action=row]"
  },
  {
    "id": "MON-10",
    "title": "통역원 출석 관리 상세",
    "parent": "MON-06",
    "summary": "통역원 출석 관리 상세 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "상세 정보",
    "selector": "[data-action=row]"
  },
  {
    "id": "STA-05",
    "title": "품목·기업·GBC/KBC 성과 통계 상세",
    "parent": "STA-04",
    "summary": "품목·기업·GBC/KBC 성과 통계 상세 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "상세 정보",
    "selector": "[data-action=row]"
  },
  {
    "id": "SET-17",
    "title": "접근·개인정보·변경 로그 상세",
    "parent": "SET-03",
    "summary": "접근·개인정보·변경 로그 상세 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "상세 정보",
    "selector": "[data-action=row]"
  },
  {
    "id": "BAS-22",
    "title": "홈페이지 연계현황·오류 점검 · 오류 상세",
    "parent": "BAS-13",
    "summary": "홈페이지 연계현황·오류 점검 · 오류 상세 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "오류 상세",
    "selector": "[data-action=action][data-label=\"오류 상세\"]"
  },
  {
    "id": "PRE-11",
    "title": "국내바이어 사전교육 관리 · 교육 등록",
    "parent": "PRE-09",
    "summary": "국내바이어 사전교육 관리 · 교육 등록 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "교육 등록",
    "selector": "[data-action=action][data-label=\"교육 등록\"]"
  },
  {
    "id": "MON-11",
    "title": "통역원 출석 관리 · 매칭 조회",
    "parent": "MON-06",
    "summary": "통역원 출석 관리 · 매칭 조회 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "매칭 조회",
    "selector": "[data-action=action][data-label=\"매칭 조회\"]"
  },
  {
    "id": "STA-06",
    "title": "품목·기업·GBC/KBC 성과 통계 · 분류 전환",
    "parent": "STA-04",
    "summary": "품목·기업·GBC/KBC 성과 통계 · 분류 전환 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "분류 전환",
    "selector": "[data-action=action][data-label=\"분류 전환\"]"
  },
  {
    "id": "SET-18",
    "title": "접근·개인정보·변경 로그 · 상세 조회",
    "parent": "SET-03",
    "summary": "접근·개인정보·변경 로그 · 상세 조회 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "상세 조회",
    "selector": "[data-action=action][data-label=\"상세 조회\"]"
  },
  {
    "id": "ENT-03",
    "title": "참가기업·제품 검색 · 상담일지 연결",
    "parent": "ENT-01",
    "summary": "참가기업·제품 검색 · 상담일지 연결 화면에서 대상 정보와 처리 내용을 확인합니다.",
    "kind": "workflow",
    "match": "상담일지 연결",
    "selector": "[data-action=action][data-label=\"상담일지 연결\"]"
  }
];
(()=>{const all=GFAIR_SCREENS.flatMap(g=>g.screens);for(const item of GFAIR_SCREEN_REGISTRY){const source=all.find(s=>s.id===(item.source||item.parent));const group=GFAIR_SCREENS.find(g=>g.screens.some(s=>s.id===item.parent))||GFAIR_SCREENS[0];group.screens.push({...source,...item,ui:{...(source?.ui||{})},workflowParent:item.kind==='workflow'?item.parent:undefined});if(window.GFAIR_SCREEN_OVERVIEWS)GFAIR_SCREEN_OVERVIEWS[item.id]=item.summary;}})();

(()=>{const all=GFAIR_SCREENS.flatMap(g=>g.screens);for(const [id,title] of [['NTC-01','공지사항 목록'],['NTC-02','FAQ 목록·답변'],['NTC-03','자료실 목록']])all.find(s=>s.id===id).title=title;})();

(()=>{const screen=GFAIR_SCREENS.flatMap(g=>g.screens).find(s=>s.id==='NTC-04');screen.title='공지사항 상세';screen.summary='공지사항의 대상·게시 정보와 본문·첨부파일을 확인합니다.';if(window.GFAIR_SCREEN_OVERVIEWS)window.GFAIR_SCREEN_OVERVIEWS['NTC-04']=screen.summary;})();

(()=>{const s=GFAIR_SCREENS.flatMap(g=>g.screens).find(s=>s.id==='NTC-02');s.summary='FAQ 질문을 선택해 답변과 첨부파일을 펼쳐 확인합니다.';if(window.GFAIR_SCREEN_OVERVIEWS)GFAIR_SCREEN_OVERVIEWS[s.id]=s.summary;})();

(()=>{for(const s of GFAIR_SCREENS.flatMap(g=>g.screens)){if(s.id==='SET-08')s.summary='그룹 기본정보와 메뉴 접근 권한을 함께 설정하고 등록합니다.';if(s.id==='SET-09')s.summary='선택한 그룹의 메뉴 접근 권한을 팝업에서 변경합니다.';if(['SET-08','SET-09'].includes(s.id)&&window.GFAIR_SCREEN_OVERVIEWS)GFAIR_SCREEN_OVERVIEWS[s.id]=s.summary;}})();

(()=>{for(const group of GFAIR_SCREENS)group.screens=group.screens.filter(s=>s.id!=='BAS-20');const s=GFAIR_SCREENS.flatMap(g=>g.screens).find(s=>s.id==='BAS-18');s.title='관리자 등록·상세';s.summary='관리자를 등록하거나 기본정보를 수정하며 기존 관리자 ID는 변경하지 않습니다.';if(window.GFAIR_SCREEN_OVERVIEWS)GFAIR_SCREEN_OVERVIEWS[s.id]=s.summary;})();

(()=>{const s=GFAIR_SCREENS.flatMap(g=>g.screens).find(s=>s.id==='SET-02');s.title='그룹 기본정보·메뉴 권한';s.summary='그룹의 기본정보와 메뉴 접근 권한을 함께 확인하고 수정합니다.';if(window.GFAIR_SCREEN_OVERVIEWS)GFAIR_SCREEN_OVERVIEWS[s.id]=s.summary;})();
