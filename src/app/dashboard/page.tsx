"use client";

import { useState } from "react";

// —— 数据结构说明 ——
// JV: 一汽大众 / 上汽大众（各含大众、奥迪品牌）
// 独立品牌: 途锐 / 保时捷 / 兰博基尼（无 JV 属性）

const mockStats = {
  pending: 23,
  inProgress: 12,
  closedToday: 47,
};

// jv: 一汽大众 | 上汽大众 | null（独立品牌无 JV）
// 工单 ID: 待认领时 sc3Id/jiraId 均为空; 处理中时显示 sc3Id; 已提交 Jira 时显示 jiraId
// responseMinutes: Response Time，从进入平台到认领生成 SC3 ID 的时间，目标 < 5 分钟
// queueMinutes: 排队等待认领的分钟数（仅待认领工单，概念上近似 responseMinutes 的倒计时）
const mockTickets = [
  {
    jv: "SAIC",
    brand: "SAIC-Audi",
    title: "经销商端报表导出失败",
    group: "L2-Report",
    ci: ["MBB-RC"],
    status: "pending",
    slaMinutes: 12,
    priority: "medium",
    createdAt: "14:15",
    sc3Id: null,
    jiraId: null,
    queueMinutes: 6,
  },
  {
    jv: null,
    brand: "Touareg",
    title: "车机系统OTA更新失败",
    group: "L2-Infra",
    ci: ["MBB-RC"],
    status: "pending",
    slaMinutes: 6,
    priority: "high",
    createdAt: "13:30",
    sc3Id: null,
    jiraId: null,
    queueMinutes: 4,
  },
  {
    jv: null,
    brand: "Porsche",
    title: "DMS库存数据同步异常",
    group: "L2-Integration",
    ci: ["RTM-DB", "ODP-PROD"],
    status: "pending",
    slaMinutes: 8,
    priority: "high",
    createdAt: "14:28",
    sc3Id: null,
    jiraId: null,
    queueMinutes: 2,
  },
  {
    jv: "FAW",
    brand: "FAW-VW",
    title: "MES系统用户无法登录",
    group: "L2-SAP-Support",
    ci: ["MBB-RC", "ODP-PROD"],
    status: "pending",
    slaMinutes: 3,
    priority: "high",
    createdAt: "14:32",
    sc3Id: null,
    jiraId: null,
    queueMinutes: 1,
  },
  {
    jv: "FAW",
    brand: "AUDI",
    title: "工单流转状态不更新",
    group: "L2-SC3-Support",
    ci: ["MBB-RC", "ODP-PROD", "RTM-DB"],
    status: "in_progress",
    slaMinutes: 1,
    priority: "high",
    createdAt: "14:05",
    assignee: "倪得洪",
    sc3Id: "IR00012345",
    jiraId: "GSP-8921",
  },
  {
    jv: "SAIC",
    brand: "SVW-VW",
    title: "用户权限配置错误",
    group: "L2-IDM",
    ci: ["ODP-PROD"],
    status: "in_progress",
    slaMinutes: 1,
    priority: "low",
    createdAt: "13:55",
    assignee: "杨香君",
    sc3Id: "RR00012346",
    jiraId: "GSP-8922",
  },
  {
    jv: null,
    brand: "Lamborghini",
    title: "系统性能下降告警",
    group: "L2-Infra",
    ci: ["RTM-DB", "MBB-RC"],
    status: "in_progress",
    slaMinutes: 1,
    priority: "medium",
    createdAt: "13:40",
    assignee: "熊川",
    sc3Id: "PR00012347",
    jiraId: "GSP-8923",
  },
];

const mockClosedTickets = [
  {
    jv: "FAW",
    brand: "FAW-VW",
    title: "数据库连接超时",
    group: "L2-DB-Support",
    ci: ["RTM-DB"],
    status: "closed",
    closedAt: "14:20",
    closedBy: "徐文秀",
    sc3Id: "IR00012300",
    jiraId: "GSP-8900",
  },
  {
    jv: null,
    brand: "Porsche",
    title: "接口响应超限",
    group: "L2-Integration",
    ci: ["ODP-PROD"],
    status: "closed",
    closedAt: "13:45",
    closedBy: "倪得洪",
    sc3Id: "RR00012301",
    jiraId: "GSP-8901",
  },
  {
    jv: "SAIC",
    brand: "SAIC-Audi",
    title: "经销商端审批流卡死",
    group: "L2-SC3-Support",
    ci: ["ODP-PROD", "RTM-DB"],
    status: "closed",
    closedAt: "12:30",
    closedBy: "郭俊杰",
    sc3Id: "IR00012302",
    jiraId: "GSP-8902",
  },
  {
    jv: null,
    brand: "Lamborghini",
    title: "车辆定位数据丢失",
    group: "L2-Integration",
    ci: ["MBB-RC", "ODP-PROD"],
    status: "closed",
    closedAt: "11:15",
    closedBy: "段晓靓",
    sc3Id: "PR00012303",
    jiraId: "GSP-8903",
  },
  {
    jv: "FAW",
    brand: "AUDI",
    title: "用户角色权限异常",
    group: "L2-IDM",
    ci: ["ODP-PROD"],
    status: "closed",
    closedAt: "10:00",
    closedBy: "钟瑶",
    sc3Id: "RR00012304",
    jiraId: "GSP-8904",
  },
];

const mockLeaderboard = [
  { name: "徐文秀", open: 18, close: 15 },
  { name: "倪得洪", open: 14, close: 12 },
  { name: "杨香君", open: 11, close: 10 },
  { name: "熊川", open: 9, close: 8 },
  { name: "郭俊杰", open: 7, close: 6 },
];

// JV 选项
const jvOptions = [
  { value: "全部", label: "全部 JV" },
  { value: "FAW", label: "FAW" },
  { value: "SAIC", label: "SAIC" },
];

// 独立品牌选项
const standaloneBrands = ["Touareg", "Porsche", "Lamborghini"];

// JV 下的品牌
const jvBrands: Record<string, string[]> = {
  "FAW": ["FAW-VW", "AUDI"],
  "SAIC": ["SVW-VW", "SAIC-Audi"],
};

const priorityColor: Record<string, string> = {
  high: "bg-red text-white",
  medium: "bg-gold text-midnight",
  low: "bg-canvas-200 text-midnight-100",
};

const slaColor = (mins: number) => {
  if (mins <= 2) return "text-green font-semibold";
  if (mins <= 5) return "text-melon font-medium";
  return "text-red font-semibold";
};

const slaBgColor = (mins: number, status: string, queueMinutes?: number) => {
  if (status === "pending") {
    const q = queueMinutes ?? 0;
    if (q <= 2) return "border-l-4 border-green-400";
    if (q <= 5) return "border-l-4 border-yellow-400";
    return "border-l-4 border-red-400";
  }
  if (mins <= 2) return "border-l-4 border-green-400";
  if (mins <= 5) return "border-l-4 border-yellow-400";
  return "border-l-4 border-red-400";
};

const brandLabel = (jv: string | null, brand: string) => {
  if (jv) return `${jv} · ${brand}`;
  return brand;
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"active" | "closed">("active");
  const [selectedJV, setSelectedJV] = useState("全部");
  const [selectedBrand, setSelectedBrand] = useState("全部");

  // 动态品牌选项
  const brandOptions = (() => {
    if (selectedJV === "全部") {
      return [
        { value: "全部", label: "全部品牌" },
        ...jvBrands["FAW"].map((b) => ({
          value: b,
          label: b,
        })),
        ...jvBrands["SAIC"].map((b) => ({
          value: b,
          label: b,
        })),
        ...standaloneBrands.map((b) => ({ value: b, label: b })),
      ];
    }
    return [
      { value: "全部", label: "全部品牌" },
      ...jvBrands[selectedJV].map((b) => ({
        value: b,
        label: b,
      })),
    ];
  })();

  const filteredActive = mockTickets
    .filter((t) => {
      if (selectedJV !== "全部" && t.jv !== selectedJV) return false;
      if (selectedBrand !== "全部") {
        const expectedBrand = selectedJV === "全部"
          ? selectedBrand.replace(/^(一汽|上汽)/, "")
          : selectedBrand;
        if (t.brand !== expectedBrand) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      if (a.status === "pending" && b.status === "pending") {
        return (b.queueMinutes ?? 0) - (a.queueMinutes ?? 0);
      }
      return (a.slaMinutes ?? 0) - (b.slaMinutes ?? 0);
    });

  const filteredClosed = mockClosedTickets.filter((t) => {
    if (selectedJV !== "全部" && t.jv !== selectedJV) return false;
    if (selectedBrand !== "全部") {
      const expectedBrand = selectedJV === "全部"
        ? selectedBrand.replace(/^(一汽|上汽)/, "")
        : selectedBrand;
      if (t.brand !== expectedBrand) return false;
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="bg-white border-b border-canvas-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-xl font-bold uppercase tracking-wide text-midnight">
            Smart Agent Desktop
          </h1>
          <nav className="flex gap-8">
            <a
              href="/dashboard"
              className="text-sm font-medium text-true-blue border-b-2 border-true-blue pb-1"
            >
              Dashboard
            </a>
            <a
              href="/agents"
              className="text-sm font-medium text-midnight-100 hover:text-true-blue"
            >
              Agents
            </a>
            <a
              href="/settings"
              className="text-sm font-medium text-midnight-100 hover:text-true-blue"
            >
              Settings
            </a>
          </nav>
        </div>
      </header>

      <div className="px-8 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="font-display text-2xl font-medium uppercase tracking-wide text-midnight">
            Dashboard
          </h2>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-canvas-200">
            <div className="text-xs font-semibold uppercase tracking-wider text-midnight-100 mb-2">
              待认领工单
            </div>
            <div className="text-4xl font-display font-bold text-midnight">
              {mockStats.pending}
            </div>
            <div className="text-xs text-red mt-2 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-red animate-pulse" />
              {mockTickets.filter((t) => t.slaMinutes <= 5).length} 条 SLA 告急
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-canvas-200">
            <div className="text-xs font-semibold uppercase tracking-wider text-midnight-100 mb-2">
              处理中工单
            </div>
            <div className="text-4xl font-display font-bold text-midnight">
              {mockStats.inProgress}
            </div>
            <div className="text-xs text-midnight-100 mt-2">
              {mockTickets.filter((t) => t.status === "in_progress" && t.assignee).length} 条已认领
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-canvas-200">
            <div className="text-xs font-semibold uppercase tracking-wider text-midnight-100 mb-2">
              今日关单
            </div>
            <div className="text-4xl font-display font-bold text-midnight">
              {mockStats.closedToday}
            </div>
            <div className="text-xs text-royal mt-2">目标: 50</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-canvas-200">
            <div className="text-xs font-semibold uppercase tracking-wider text-midnight-100 mb-2">
              SLA 达标率
            </div>
            <div className="text-4xl font-display font-bold text-royal">
              94.2%
            </div>
            <div className="w-full bg-canvas-200 rounded-full h-2 mt-3">
              <div className="bg-royal h-2 rounded-full" style={{ width: "94.2%" }} />
            </div>
            <div className="flex justify-between mt-3 text-xs text-midnight-100">
              <span>响应 3.2m</span>
              <span>解决 28m</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Ticket List */}
          <div className="col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-canvas-200 overflow-hidden">
              {/* Tab Bar */}
              <div className="flex border-b border-canvas-200 relative z-10">
                <button
                  onClick={() => setActiveTab("active")}
                  className={`flex-1 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all cursor-pointer ${
                    activeTab === "active"
                      ? "text-true-blue border-b-2 border-true-blue bg-true-blue/5"
                      : "text-midnight-100 hover:bg-canvas hover:text-midnight border-b-2 border-transparent"
                  }`}
                >
                  待处理
                </button>
                <button
                  onClick={() => setActiveTab("closed")}
                  className={`flex-1 px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-all cursor-pointer ${
                    activeTab === "closed"
                      ? "text-true-blue border-b-2 border-true-blue bg-true-blue/5"
                      : "text-midnight-100 hover:bg-canvas hover:text-midnight border-b-2 border-transparent"
                  }`}
                >
                  已关闭
                </button>
              </div>

              {/* Filters */}
              <div className="px-6 py-3 flex gap-3 border-b border-canvas-200 bg-canvas/30">
                <select
                  value={selectedJV}
                  onChange={(e) => {
                    setSelectedJV(e.target.value);
                    setSelectedBrand("全部");
                  }}
                  className="text-sm text-midnight bg-white border border-canvas-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-true-blue cursor-pointer"
                >
                  {jvOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="text-sm text-midnight bg-white border border-canvas-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-true-blue cursor-pointer"
                >
                  {brandOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="ml-auto text-xs text-midnight-100 self-center">
                  {activeTab === "active"
                    ? `${filteredActive.length} 条工单`
                    : `${filteredClosed.length} 条工单`}
                </div>
              </div>

              {/* Ticket List */}
              <div className="divide-y divide-canvas-200">
                {activeTab === "active" ? (
                  filteredActive.length === 0 ? (
                    <div className="py-12 text-center text-midnight-100 text-sm">无工单</div>
                  ) : (
                    filteredActive.map((ticket) => (
                      <div
                        key={ticket.sc3Id ?? `${ticket.title}-${ticket.createdAt}`}
                        className={`px-6 py-4 transition-colors cursor-pointer group ${slaBgColor(ticket.slaMinutes, ticket.status, ticket.queueMinutes)}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {ticket.sc3Id ? (
                              <span className="font-display text-sm font-bold text-midnight">
                                {ticket.sc3Id}
                              </span>
                            ) : (
                              <span className="text-xs text-midnight-300 italic">未创建</span>
                            )}
                            {ticket.jiraId && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-canvas-200 text-midnight-100 font-mono">
                                {ticket.jiraId}
                              </span>
                            )}
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide ${
                                ticket.status === "pending"
                                  ? "bg-sky/30 text-royal"
                                  : "bg-true-blue/10 text-true-blue"
                              }`}
                            >
                              {ticket.status === "pending" ? "待认领" : "处理中"}
                            </span>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-semibold ${priorityColor[ticket.priority]}`}
                            >
                              {ticket.priority === "high"
                                ? "高优"
                                : ticket.priority === "medium"
                                ? "中优"
                                : "低优"}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-midnight-100">
                              {brandLabel(ticket.jv, ticket.brand)}
                            </span>
                            <span className={slaColor(ticket.slaMinutes)}>
                              Response {ticket.slaMinutes}m
                            </span>
                            <span className="text-midnight-100">{ticket.createdAt}</span>
                          </div>
                        </div>

                        <p className="text-sm font-semibold text-midnight group-hover:text-true-blue transition-colors mb-2">
                          {ticket.title}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-midnight-100">
                          <span>{ticket.group}</span>
                          <span>CI: {ticket.ci.join(", ")}</span>
                          {ticket.assignee ? (
                            <span className="ml-auto text-true-blue font-medium">
                              → {ticket.assignee}
                            </span>
                          ) : (
                            <span className="ml-auto text-xs px-3 py-1 bg-true-blue text-white rounded-lg font-semibold hover:bg-royal transition-colors">
                              认领
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )
                ) : (
                  filteredClosed.length === 0 ? (
                    <div className="py-12 text-center text-midnight-100 text-sm">无已关闭工单</div>
                  ) : (
                    filteredClosed.map((ticket) => (
                      <div
                        key={ticket.sc3Id}
                        className="px-6 py-4 hover:bg-canvas/50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="font-display text-sm font-bold text-midnight">
                              {ticket.sc3Id}
                            </span>
                            {ticket.jiraId && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-canvas-200 text-midnight-100 font-mono">
                                {ticket.jiraId}
                              </span>
                            )}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-canvas-200 text-midnight-100 font-semibold uppercase tracking-wide">
                              已关闭
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-midnight-100">
                            <span>{brandLabel(ticket.jv, ticket.brand)}</span>
                            <span>{ticket.closedAt}</span>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-midnight group-hover:text-true-blue transition-colors mb-1">
                          {ticket.title}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-midnight-100">
                          <span>{ticket.group}</span>
                          <span className="ml-auto">关单人: {ticket.closedBy}</span>
                        </div>
                      </div>
                    ))
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Agent Leaderboard */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-canvas-200">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-midnight mb-4">
                Agent 排行榜
              </h3>
              <div className="space-y-3">
                {mockLeaderboard.map((agent, i) => (
                  <div key={agent.name} className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        i === 0
                          ? "bg-gold text-midnight"
                          : i === 1
                          ? "bg-canvas-300 text-midnight"
                          : i === 2
                          ? "bg-peach text-midnight"
                          : "bg-canvas-200 text-midnight-100"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="flex-1 text-sm font-medium text-midnight truncate">
                      {agent.name}
                    </span>
                    <span className="text-xs text-midnight-100 shrink-0">
                      <span className="font-semibold text-midnight">{agent.open}</span> 开
                    </span>
                    <span className="text-xs text-midnight-100 shrink-0">
                      <span className="font-semibold text-royal">{agent.close}</span> 关
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Distribution */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-canvas-200">
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-midnight mb-4">
                品牌分布
              </h3>
              <div className="space-y-2">
                {[
                  { label: "FAW-VW", count: 5 },
                  { label: "Porsche", count: 6 },
                  { label: "SAIC-Audi", count: 4 },
                  { label: "AUDI", count: 3 },
                  { label: "Lamborghini", count: 2 },
                  { label: "Touareg", count: 3 },
                ].map((b) => (
                  <div key={b.label} className="flex items-center gap-3">
                    <span className="text-xs text-midnight-100 w-24 truncate">{b.label}</span>
                    <div className="flex-1 bg-canvas-200 rounded-full h-1.5">
                      <div
                        className="bg-true-blue h-1.5 rounded-full"
                        style={{ width: `${(b.count / 6) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-midnight w-4 text-right">
                      {b.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
