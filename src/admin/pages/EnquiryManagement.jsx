/* ============================================
   General Enquiry Management Page
   Manages submissions captured by the contact
   "Send us a message" form. Storage is kept
   separate from admission leads.
   ============================================ */

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Checkbox,
  IconButton,
  Chip,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import { Icon } from "@iconify/react";
import {
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  deleteEnquiries,
  exportEnquiriesCSV,
  getEnquiryStats,
} from "../utils/enquiryService";
import useMediaQuery from "../../hooks/useMediaQuery";
import styles from "./LeadManagement.module.css";

const STATUS_OPTIONS = [
  { value: "new", label: "New", color: "#2B7BD5", bg: "#EBF5FF" },
  { value: "in_progress", label: "In Progress", color: "#F59E0B", bg: "#FFF7ED" },
  { value: "resolved", label: "Resolved", color: "#10B981", bg: "#ECFDF5" },
  { value: "spam", label: "Spam", color: "#EF4444", bg: "#FEF2F2" },
];

const DATE_RANGE_OPTIONS = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "custom", label: "Custom Range" },
];

const getStatusConfig = (status) =>
  STATUS_OPTIONS.find((s) => s.value === status) || STATUS_OPTIONS[0];

const formatShortDate = (dateStr) => {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const truncate = (val, max = 60) => {
  const s = String(val ?? "");
  return s.length > max ? `${s.slice(0, max)}…` : s;
};

const COLUMNS = [
  { id: "submitted_at", label: "Submitted At", sortable: true, width: 150 },
  { id: "name", label: "Name", sortable: true },
  { id: "mobile", label: "Mobile", sortable: true, width: 130 },
  { id: "email", label: "Email", sortable: true, width: 200 },
  { id: "service_interest", label: "Programme", sortable: true, width: 140 },
  { id: "message", label: "Message", sortable: false },
  { id: "status", label: "Status", sortable: true, width: 150 },
];

const EnquiryManagement = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [stats, setStats] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const [orderBy, setOrderBy] = useState("submitted_at");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [detailOpen, setDetailOpen] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const isMobile = useMediaQuery("(max-width: 768px)");

  const loadData = useCallback(() => {
    const filters = {
      search,
      status: statusFilter,
      dateRange,
      startDate: customStart,
      endDate: customEnd,
    };
    setEnquiries(getEnquiries(filters));
    setStats(getEnquiryStats());
  }, [search, statusFilter, dateRange, customStart, customEnd]);

  const loadDataRef = useRef(loadData);
  useEffect(() => {
    loadDataRef.current = loadData;
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Live-sync: refresh on same-tab submit and cross-tab storage events.
  useEffect(() => {
    const handleEnquirySubmitted = () => loadDataRef.current();
    const handleStorage = (e) => {
      if (
        e.key === "lp_general_enquiries" ||
        e.key === "lp_test_enquiries"
      ) {
        loadDataRef.current();
      }
    };
    window.addEventListener("lp:enquiry-submitted", handleEnquirySubmitted);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(
        "lp:enquiry-submitted",
        handleEnquirySubmitted
      );
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const sortedEnquiries = useMemo(() => {
    const sorted = [...enquiries];
    sorted.sort((a, b) => {
      let aVal = a[orderBy] || "";
      let bVal = b[orderBy] || "";
      if (orderBy === "submitted_at") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }
      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [enquiries, orderBy, order]);

  const paginated = useMemo(
    () =>
      sortedEnquiries.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [sortedEnquiries, page, rowsPerPage]
  );

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSort = (column) => {
    if (orderBy === column) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setOrderBy(column);
      setOrder("asc");
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelected(paginated.map((l) => l.enquiry_id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleStatusChange = (id, newStatus) => {
    updateEnquiryStatus(id, newStatus);
    loadData();
    showSnackbar(`Status updated to "${newStatus}"`);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteEnquiry(deleteTarget);
      showSnackbar("Enquiry deleted");
    } else {
      deleteEnquiries(selected);
      showSnackbar(`${selected.length} enquiries deleted`);
      setSelected([]);
    }
    setDeleteDialogOpen(false);
    setDeleteTarget(null);
    loadData();
  };

  const handleExport = () => {
    const dataToExport =
      selected.length > 0
        ? enquiries.filter((e) => selected.includes(e.enquiry_id))
        : enquiries;
    exportEnquiriesCSV(dataToExport);
    showSnackbar(`Exported ${dataToExport.length} enquiries`);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDateRange("all");
    setCustomStart("");
    setCustomEnd("");
    setPage(0);
  };

  const hasActiveFilters =
    search ||
    statusFilter !== "all" ||
    dateRange !== "all";

  const detailEnquiry = detailOpen
    ? enquiries.find((e) => e.enquiry_id === detailOpen)
    : null;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>General Enquiry</h1>
          <p className={styles.pageSubtitle}>
            Messages submitted via the contact "Send us a message" form.
          </p>
        </div>
        <div className={styles.headerActions}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Icon icon="mdi:download" />}
            onClick={handleExport}
            sx={{
              textTransform: "none",
              borderColor: "var(--admin-border)",
              color: "var(--admin-text-secondary)",
              "&:hover": {
                borderColor: "var(--admin-accent)",
                color: "var(--admin-accent)",
              },
            }}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {stats && (
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconBlue}`}>
              <Icon icon="mdi:message-text" width={20} />
            </div>
            <div>
              <p className={styles.statValue}>{stats.total}</p>
              <p className={styles.statLabel}>Total Enquiries</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconGreen}`}>
              <Icon icon="mdi:message-plus" width={20} />
            </div>
            <div>
              <p className={styles.statValue}>{stats.newToday}</p>
              <p className={styles.statLabel}>New Today</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconTeal}`}>
              <Icon icon="mdi:calendar-week" width={20} />
            </div>
            <div>
              <p className={styles.statValue}>{stats.thisWeek}</p>
              <p className={styles.statLabel}>This Week</p>
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.statIconOrange}`}>
              <Icon icon="mdi:check-circle" width={20} />
            </div>
            <div>
              <p className={styles.statValue}>{stats.resolved}</p>
              <p className={styles.statLabel}>Resolved</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.card}>
        <div className={styles.filtersBar}>
          <TextField
            size="small"
            placeholder="Search by name, email, mobile, or message..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="mdi:magnify"
                    width={20}
                    style={{ color: "var(--admin-text-muted)" }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              flex: "1 1 240px",
              minWidth: isMobile ? "100%" : 240,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--admin-accent)",
                },
              },
            }}
          />
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(0);
              }}
              sx={{
                borderRadius: "8px",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--admin-accent)",
                },
              }}
            >
              <MenuItem value="all">All Status</MenuItem>
              {STATUS_OPTIONS.map((s) => (
                <MenuItem key={s.value} value={s.value}>
                  {s.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Date Range</InputLabel>
            <Select
              value={dateRange}
              label="Date Range"
              onChange={(e) => {
                setDateRange(e.target.value);
                setPage(0);
              }}
              sx={{
                borderRadius: "8px",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--admin-accent)",
                },
              }}
            >
              {DATE_RANGE_OPTIONS.map((d) => (
                <MenuItem key={d.value} value={d.value}>
                  {d.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {dateRange === "custom" && (
            <>
              <TextField
                size="small"
                type="date"
                label="Start Date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ minWidth: 140 }}
              />
              <TextField
                size="small"
                type="date"
                label="End Date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ minWidth: 140 }}
              />
            </>
          )}
        </div>

        {hasActiveFilters && (
          <div className={styles.filterChips}>
            {search && (
              <Chip
                label={`Search: "${search}"`}
                size="small"
                onDelete={() => setSearch("")}
                sx={{
                  bgcolor: "#EBF5FF",
                  color: "var(--admin-accent)",
                  "& .MuiChip-deleteIcon": { color: "var(--admin-accent)" },
                }}
              />
            )}
            {statusFilter !== "all" && (
              <Chip
                label={`Status: ${getStatusConfig(statusFilter).label}`}
                size="small"
                onDelete={() => setStatusFilter("all")}
                sx={{
                  bgcolor: getStatusConfig(statusFilter).bg,
                  color: getStatusConfig(statusFilter).color,
                  "& .MuiChip-deleteIcon": {
                    color: getStatusConfig(statusFilter).color,
                  },
                }}
              />
            )}
            {dateRange !== "all" && (
              <Chip
                label={`Date: ${
                  DATE_RANGE_OPTIONS.find((d) => d.value === dateRange)?.label
                }`}
                size="small"
                onDelete={() => {
                  setDateRange("all");
                  setCustomStart("");
                  setCustomEnd("");
                }}
                sx={{
                  bgcolor: "#EBF5FF",
                  color: "var(--admin-accent)",
                  "& .MuiChip-deleteIcon": { color: "var(--admin-accent)" },
                }}
              />
            )}
            <Chip
              label="Clear All"
              size="small"
              variant="outlined"
              onClick={clearFilters}
              sx={{
                cursor: "pointer",
                borderColor: "var(--admin-text-muted)",
                color: "var(--admin-text-muted)",
              }}
            />
          </div>
        )}

        {selected.length > 0 && (
          <div className={styles.bulkBar}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "var(--admin-accent)", flex: 1 }}
            >
              {selected.length} enquir{selected.length > 1 ? "ies" : "y"}{" "}
              selected
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="error"
              startIcon={<Icon icon="mdi:trash-can-outline" />}
              onClick={() => {
                setDeleteTarget(null);
                setDeleteDialogOpen(true);
              }}
              sx={{ textTransform: "none" }}
            >
              Delete
            </Button>
          </div>
        )}

        {paginated.length === 0 ? (
          <div className={styles.emptyState}>
            <Icon
              icon="mdi:message-text-outline"
              width={64}
              className={styles.emptyIcon}
            />
            <p className={styles.emptyText}>No enquiries yet</p>
            <p className={styles.emptySubtext}>
              Submissions from the contact form will appear here.
            </p>
          </div>
        ) : (
          <>
            <div className={`${styles.tableWrap} ${styles.desktopTable}`}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        size="small"
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < paginated.length
                        }
                        checked={
                          paginated.length > 0 &&
                          selected.length === paginated.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    {COLUMNS.map((col) => (
                      <TableCell
                        key={col.id}
                        style={{ width: col.width || "auto" }}
                        sortDirection={orderBy === col.id ? order : false}
                      >
                        {col.sortable ? (
                          <TableSortLabel
                            active={orderBy === col.id}
                            direction={orderBy === col.id ? order : "asc"}
                            onClick={() => handleSort(col.id)}
                          >
                            {col.label}
                          </TableSortLabel>
                        ) : (
                          col.label
                        )}
                      </TableCell>
                    ))}
                    <TableCell width={100}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginated.map((enquiry) => {
                    const statusCfg = getStatusConfig(enquiry.status);
                    const isSelected = selected.includes(enquiry.enquiry_id);
                    return (
                      <TableRow
                        key={enquiry.enquiry_id}
                        hover
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            size="small"
                            checked={isSelected}
                            onChange={() =>
                              handleSelectOne(enquiry.enquiry_id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <div style={{ fontSize: "0.8125rem" }}>
                            {formatShortDate(enquiry.submitted_at)}
                          </div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--admin-text-muted)",
                            }}
                          >
                            {formatTime(enquiry.submitted_at)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: 600 }}
                          >
                            {enquiry.name || "—"}
                          </Typography>
                        </TableCell>
                        <TableCell>{enquiry.mobile || "—"}</TableCell>
                        <TableCell>{enquiry.email || "—"}</TableCell>
                        <TableCell>{enquiry.service_interest || "—"}</TableCell>
                        <TableCell>
                          <Tooltip title={enquiry.message || ""}>
                            <span>{truncate(enquiry.message, 60) || "—"}</span>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <Select
                            size="small"
                            value={enquiry.status || "new"}
                            onChange={(e) =>
                              handleStatusChange(
                                enquiry.enquiry_id,
                                e.target.value
                              )
                            }
                            sx={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: statusCfg.color,
                              bgcolor: statusCfg.bg,
                              borderRadius: "6px",
                              "& fieldset": { border: "none" },
                              "& .MuiSelect-select": {
                                padding: "4px 24px 4px 8px",
                              },
                            }}
                          >
                            {STATUS_OPTIONS.map((s) => (
                              <MenuItem key={s.value} value={s.value}>
                                {s.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="View details">
                            <IconButton
                              size="small"
                              onClick={() => setDetailOpen(enquiry.enquiry_id)}
                            >
                              <Icon icon="mdi:eye-outline" width={18} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              size="small"
                              onClick={() => {
                                setDeleteTarget(enquiry.enquiry_id);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Icon
                                icon="mdi:trash-can-outline"
                                width={18}
                                style={{ color: "#EF4444" }}
                              />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className={styles.mobileCards}>
              {paginated.map((enquiry) => {
                const statusCfg = getStatusConfig(enquiry.status);
                const isSelected = selected.includes(enquiry.enquiry_id);
                return (
                  <div
                    key={enquiry.enquiry_id}
                    className={`${styles.leadCard} ${
                      isSelected ? styles.leadCardSelected : ""
                    }`}
                  >
                    <div className={styles.leadCardRow}>
                      <p className={styles.leadCardName}>
                        {enquiry.name || "—"}
                      </p>
                      <span className={styles.leadCardDate}>
                        {formatShortDate(enquiry.submitted_at)}
                      </span>
                    </div>
                    <p className={styles.leadCardMobile}>
                      {enquiry.mobile || "—"}
                    </p>
                    {enquiry.email && (
                      <p className={styles.leadCardMobile}>{enquiry.email}</p>
                    )}
                    {enquiry.message && (
                      <p
                        style={{
                          fontSize: "0.8125rem",
                          color: "var(--admin-text-secondary)",
                          margin: "8px 0 0",
                        }}
                      >
                        {truncate(enquiry.message, 100)}
                      </p>
                    )}
                    <div className={styles.leadCardChips}>
                      <Chip
                        label={statusCfg.label}
                        size="small"
                        sx={{
                          bgcolor: statusCfg.bg,
                          color: statusCfg.color,
                          fontWeight: 600,
                        }}
                      />
                    </div>
                    <div className={styles.leadCardActions}>
                      <IconButton
                        size="small"
                        onClick={() => setDetailOpen(enquiry.enquiry_id)}
                      >
                        <Icon icon="mdi:eye-outline" width={20} />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => {
                          setDeleteTarget(enquiry.enquiry_id);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Icon
                          icon="mdi:trash-can-outline"
                          width={20}
                          style={{ color: "#EF4444" }}
                        />
                      </IconButton>
                    </div>
                  </div>
                );
              })}
            </div>

            <TablePagination
              component="div"
              count={sortedEnquiries.length}
              page={page}
              onPageChange={(_, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[5, 10, 25, 50]}
            />
          </>
        )}
      </div>

      {/* Detail dialog */}
      <Dialog
        open={!!detailOpen}
        onClose={() => setDetailOpen(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Enquiry Details</DialogTitle>
        <DialogContent dividers>
          {detailEnquiry ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <DetailRow label="Name" value={detailEnquiry.name} />
              <DetailRow label="Mobile" value={detailEnquiry.mobile} />
              <DetailRow label="Email" value={detailEnquiry.email} />
              <DetailRow
                label="Programme of Interest"
                value={detailEnquiry.service_interest}
              />
              <DetailRow
                label="Message"
                value={detailEnquiry.message}
                multiline
              />
              <DetailRow label="Source" value={detailEnquiry.source} />
              <DetailRow
                label="Submitted At"
                value={
                  detailEnquiry.submitted_at
                    ? new Date(detailEnquiry.submitted_at).toLocaleString(
                        "en-IN"
                      )
                    : ""
                }
              />
              <DetailRow label="Page URL" value={detailEnquiry.page_url} />
              {(detailEnquiry.utm_source ||
                detailEnquiry.utm_medium ||
                detailEnquiry.utm_campaign) && (
                <>
                  <DetailRow
                    label="UTM Source"
                    value={detailEnquiry.utm_source}
                  />
                  <DetailRow
                    label="UTM Medium"
                    value={detailEnquiry.utm_medium}
                  />
                  <DetailRow
                    label="UTM Campaign"
                    value={detailEnquiry.utm_campaign}
                  />
                </>
              )}
            </div>
          ) : (
            <DialogContentText>Enquiry not found.</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailOpen(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete enquir{deleteTarget ? "y" : "ies"}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {deleteTarget
              ? "This enquiry will be permanently deleted."
              : `${selected.length} enquiries will be permanently deleted.`}{" "}
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const DetailRow = ({ label, value, multiline = false }) => (
  <div>
    <Typography
      variant="caption"
      sx={{
        color: "var(--admin-text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        fontWeight: 600,
      }}
    >
      {label}
    </Typography>
    <Typography
      variant="body2"
      sx={{
        color: "var(--admin-text-primary)",
        whiteSpace: multiline ? "pre-wrap" : "normal",
        wordBreak: "break-word",
        marginTop: "2px",
      }}
    >
      {value || "—"}
    </Typography>
  </div>
);

export default EnquiryManagement;
