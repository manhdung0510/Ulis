import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '@/app/App';
import { resetSimulatedDelayRange, setSimulatedDelayRange } from '@/services/delay';
import { clearAllUserDataInStorage, readStorageState } from '@/services/storage';
import { changeAppLanguage } from '@/i18n';

describe('end-to-end UI flows across P0 and P1 pages', () => {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  let capturedErrors: unknown[][] = [];
  let capturedWarnings: unknown[][] = [];

  beforeEach(() => {
    setSimulatedDelayRange(0, 0);
    window.localStorage.clear();
    clearAllUserDataInStorage();
    // Reset onboarding so we also verify first-visit onboarding dialog
    window.localStorage.removeItem('hoa-demo:v1');
    changeAppLanguage('vi');
    window.location.hash = '#/';

    capturedErrors = [];
    capturedWarnings = [];
    console.error = (...args: unknown[]) => {
      capturedErrors.push(args);
    };
    console.warn = (...args: unknown[]) => {
      capturedWarnings.push(args);
    };
  });

  afterEach(() => {
    if (capturedErrors.length > 0) {
      originalConsoleError('CAPTURED_ERRORS:', capturedErrors);
    }
    if (capturedWarnings.length > 0) {
      originalConsoleWarn('CAPTURED_WARNINGS:', capturedWarnings);
    }
    cleanup();
    resetSimulatedDelayRange();
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
  });

  it('completes check-in, Thought Record 5-step flow, journal inspection, and delete all data without blocking modal', async () => {
    render(<App />);

    // 1. Navigate to Check-in directly without an interrupting first-visit modal
    const checkinCta = await screen.findByRole('link', { name: /Check-in hôm nay|Cập nhật check-in/ });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(checkinCta);
    expect(await screen.findByRole('heading', { name: 'Check-in cảm xúc hôm nay' })).toBeInTheDocument();

    // Validation when no emotion chosen
    fireEvent.click(screen.getByRole('button', { name: 'Lưu check-in hôm nay' }));
    expect(await screen.findByText('Bạn hãy chọn một cảm xúc trước khi lưu nhé.')).toBeInTheDocument();

    // Select emotion + intensity + note and save
    fireEvent.click(screen.getByLabelText('Lo lắng', { selector: 'input' }));
    fireEvent.click(screen.getByLabelText('4 — Khá rõ', { selector: 'input' }));
    fireEvent.change(screen.getByLabelText(/Vài dòng ghi chú nếu muốn/), {
      target: { value: 'Hơi hồi hộp trước buổi thuyết trình tiếng Anh.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Lưu check-in hôm nay' }));

    expect(await screen.findByText('Cảm ơn bạn đã dừng lại một chút')).toBeInTheDocument();
    expect(screen.getByText('Nhật ký suy nghĩ')).toBeInTheDocument();

    // 3. Start suggested exercise (Thought Record)
    const startButtons = screen.getAllByRole('link', { name: 'Bắt đầu bài tập' });
    fireEvent.click(startButtons[0]!);

    expect(await screen.findByText('1. Tình huống vừa xảy ra')).toBeInTheDocument();
    // Gentle min-length check
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
    expect(await screen.findByText(/ít nhất 10 ký tự/)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Tình huống/), {
      target: { value: 'Sáng thứ Tư ở lớp kỹ năng nói tiếng Anh trước giờ thuyết trình.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));

    // Step 2: Thought + Emotion
    expect(await screen.findByText('2. Suy nghĩ tự động và cảm xúc')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Điều thoáng qua trong đầu mình/), {
      target: { value: 'Mình chắc chắn sẽ quên hết từ vựng và làm hỏng bài nói.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));

    // Step 3: Distortions
    expect(await screen.findByText('3. Nhận diện sai lệch nhận thức')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/Phóng đại hoặc coi nhẹ/, { selector: 'input' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));

    // Step 4: Evidence
    expect(await screen.findByText('4. Kiểm chứng bằng chứng thực tế')).toBeInTheDocument();
    fireEvent.change(
      screen.getByLabelText(/Điều gì cho thấy suy nghĩ đó chưa hẳn là toàn bộ sự thật/),
      { target: { value: 'Mình đã tập dượt hai lần với bạn cùng nhóm và có thẻ từ khóa.' } }
    );
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));

    // Step 5: Balanced thought
    expect(await screen.findByText('5. Viết lại suy nghĩ cân bằng hơn')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Suy nghĩ cân bằng hơn/), {
      target: { value: 'Có thể mình hơi run lúc mở đầu, nhưng mình vẫn truyền đạt được ý chính.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));

    // Summary screen
    expect(await screen.findByText('Bản tóm tắt bài tập')).toBeInTheDocument();
    expect(screen.getByText('Suy nghĩ ban đầu')).toBeInTheDocument();
    expect(screen.getByText('Suy nghĩ cân bằng hơn')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Lưu vào nhật ký' }));
    expect(await screen.findByRole('link', { name: 'Mở Nhật ký' })).toBeInTheDocument();

    // 4. Open Journal and verify both entries
    fireEvent.click(screen.getByRole('link', { name: 'Mở Nhật ký' }));
    expect(await screen.findByRole('heading', { name: 'Nhật ký của bạn' })).toBeInTheDocument();
    expect(await screen.findByText('Check-in cảm xúc')).toBeInTheDocument();
    expect(screen.getByText('Bài tập CBT')).toBeInTheDocument();

    // 5. Delete all user data (2-step confirmation)
    fireEvent.click(screen.getAllByRole('button', { name: 'Xóa toàn bộ dữ liệu của tôi' })[0]!);
    expect(await screen.findByText('Bạn muốn xóa toàn bộ dữ liệu cá nhân?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục xác nhận' }));
    expect(await screen.findByText('Xác nhận lần cuối')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Xóa toàn bộ ngay' }));

    expect(await screen.findByText('Nhật ký còn đang trống')).toBeInTheDocument();
    expect(readStorageState().moodCheckins).toHaveLength(0);
    expect(readStorageState().exerciseEntries).toHaveLength(0);
    expect(capturedErrors).toHaveLength(0);
    expect(capturedWarnings).toHaveLength(0);
  });

  it('supports consultation Q&A, 1-on-1 booking, support page, and live VI/EN toggle', async () => {
    // Mark onboarding dismissed so we jump straight in
    window.localStorage.setItem(
      'hoa-demo:v1',
      JSON.stringify({
        version: 1,
        language: 'vi',
        onboardingDismissed: true,
        moodCheckins: [],
        exerciseEntries: [],
        exerciseDrafts: {},
        consultPosts: [],
        appointments: [],
      })
    );
    window.location.hash = '#/tham-van';

    render(<App />);

    expect(await screen.findByRole('heading', { name: 'Cổng tham vấn ULIS (mô phỏng)' })).toBeInTheDocument();
    expect(screen.getByText('Bản demo: nội dung không được gửi tới giảng viên thật.')).toBeInTheDocument();

    // Empty state on "Bài của tôi" filter before posting
    fireEvent.click(screen.getByRole('button', { name: 'Bài của tôi' }));
    expect(await screen.findByText('Chưa có câu hỏi nào trong mục này.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Tất cả chủ đề' }));

    // Ask question flow
    fireEvent.click(await screen.findByRole('button', { name: 'Đặt câu hỏi' }));
    expect(await screen.findByText('Đặt câu hỏi tham vấn (mô phỏng)')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Tiêu đề ngắn gọn/), {
      target: { value: 'Áp lực trước kỳ thi nói' },
    });
    fireEvent.change(screen.getByLabelText(/Điều bạn muốn chia sẻ/), {
      target: { value: 'Mình hơi lo lắng mỗi khi phải trả lời vấn đáp trước giảng viên.' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
    expect(await screen.findByText('Kiểm tra lại trước khi đăng')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Đăng câu hỏi (demo)' }));
    await waitFor(() => {
      expect(screen.queryByText('Kiểm tra lại trước khi đăng')).not.toBeInTheDocument();
    });

    expect(await screen.findByText('Áp lực trước kỳ thi nói')).toBeInTheDocument();
    expect(screen.getAllByText('Đang chờ phản hồi').length).toBeGreaterThanOrEqual(1);

    // Switch to Counselors tab & book a session
    fireEvent.click(screen.getByRole('tab', { name: 'Giảng viên' }));
    expect(await screen.findByText('Cô Minh Thư (mẫu)')).toBeInTheDocument();
    const bookButtons = screen.getAllByRole('button', { name: 'Đặt lịch' });
    fireEvent.click(bookButtons[0]!);

    // Step 2 (date pre-selected from counselor card)
    expect(await screen.findByText('Đặt lịch hẹn 1-1 (mô phỏng)')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));

    // Step 3: pick first available slot
    const availableBtn = (await screen.findAllByRole('button', { name: /Còn trống/ }))[0]!;
    fireEvent.click(availableBtn);
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));

    // Step 4: form + demo acknowledgement
    fireEvent.change(screen.getByLabelText(/Tên hoặc biệt danh của bạn/), {
      target: { value: 'Thảo Vy' },
    });
    fireEvent.change(screen.getByLabelText(/Email \/ Zalo \/ SĐT/), {
      target: { value: 'thaovy@example.com' },
    });
    fireEvent.click(screen.getByLabelText(/Mình hiểu đây là bản demo/));
    fireEvent.click(screen.getByRole('button', { name: 'Xác nhận đặt lịch (demo)' }));

    expect(await screen.findByText('Đã lưu lịch hẹn mô phỏng')).toBeInTheDocument();
    expect(screen.getByText(/^HOA-[A-Z0-9]{6}$/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tải lịch hẹn (.ics)' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Lịch hẹn của tôi' }));
    expect(await screen.findByText('Lịch hẹn sắp tới')).toBeInTheDocument();

    // Toggle language VI -> EN without reload
    const langBtn = screen.getByRole('button', { name: /Ngôn ngữ/ });
    fireEvent.click(langBtn);
    expect(
      await screen.findByRole('heading', { name: 'ULIS Consultation Portal (demo)' })
    ).toBeInTheDocument();
    expect(document.documentElement.lang).toBe('en');

    // Navigate to Support page in EN
    fireEvent.click(screen.getByRole('link', { name: 'Need support' }));
    expect(
      await screen.findByRole('heading', { name: 'When you need support right now' })
    ).toBeInTheDocument();
    expect(screen.getByText('Medical Emergency 115')).toBeInTheDocument();
    expect(screen.getByText('National Child Protection Helpline 111')).toBeInTheDocument();
    expect(vi.isFakeTimers()).toBe(false);
    expect(capturedErrors).toHaveLength(0);
    expect(capturedWarnings).toHaveLength(0);
  });
});
