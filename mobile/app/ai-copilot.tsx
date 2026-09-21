import React, { useState, useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AIInsightCard } from '~/components/AIInsightCard';
import { Colors } from '~/constants/Colors';
import { aiInsights, revenueData, inventoryItems, formatCompactCurrency } from '~/data/mockData';

const SUGGESTED_QUESTIONS = [
  'Doanh thu tuần này thế nào?',
  'Nguyên liệu nào cần nhập thêm?',
  'Món nào đang bán chậm?',
  'Lợi nhuận so với tháng trước?',
  'Gợi ý cách tăng doanh thu cuối tuần?',
  'Phân tích khách hàng thường xuyên',
];

interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const generateAIResponse = (question: string): string => {
  const q = question.toLowerCase();
  if (q.includes('doanh thu') || q.includes('revenue')) {
    const total = revenueData.reduce((a, b) => a + b.revenue, 0);
    const avg = total / revenueData.length;
    return `📊 **Phân tích doanh thu tuần này:**\n\nTổng doanh thu 7 ngày: **${formatCompactCurrency(total)}**\nTrung bình mỗi ngày: **${formatCompactCurrency(avg)}**\n\nNgày có doanh thu cao nhất là Chủ nhật với **${formatCompactCurrency(revenueData[6].revenue)}** (${revenueData[6].orders} đơn hàng).\n\n💡 *Gợi ý: Tổ chức khuyến mãi vào thứ 3 và thứ 4 để cân bằng lượng khách trong tuần.*`;
  }
  if (q.includes('nguyên liệu') || q.includes('kho') || q.includes('nhập')) {
    const low = inventoryItems.filter(i => i.status !== 'in_stock');
    return `⚠️ **Cảnh báo tồn kho:**\n\n${low.map(i => `• **${i.name}**: ${i.status === 'out_of_stock' ? 'Đã hết hàng' : `Còn ${i.quantity} ${i.unit} (tối thiểu ${i.minStock} ${i.unit})`}`).join('\n')}\n\n💡 *Khuyến nghị đặt hàng ngay hôm nay để đảm bảo có hàng phục vụ cuối tuần.*`;
  }
  if (q.includes('bán chậm') || q.includes('ít') || q.includes('kém')) {
    return `📉 **Phân tích sản phẩm bán chậm:**\n\n• **Nước Ép Cam Tươi**: Tạm ngừng phục vụ, doanh thu 0₫\n• **Bánh Xèo**: 21 đơn hôm nay, thấp hơn trung bình 15%\n• **Nem Rán**: Xu hướng giảm trong 3 ngày qua\n\n💡 *Gợi ý: Thêm combo "Bánh Xèo + Gỏi Cuốn" với giá ưu đãi để kích thích nhu cầu.*`;
  }
  if (q.includes('lợi nhuận') || q.includes('profit')) {
    const weekProfit = revenueData.reduce((a, b) => a + b.revenue - b.expenses, 0);
    const weekRevenue = revenueData.reduce((a, b) => a + b.revenue, 0);
    const margin = Math.round((weekProfit / weekRevenue) * 100);
    return `💰 **Phân tích lợi nhuận tuần này:**\n\nLợi nhuận ròng: **${formatCompactCurrency(weekProfit)}**\nBiên lợi nhuận: **${margin}%**\n\nSo với tuần trước: **tăng 24%** 📈\n\nChi phí lớn nhất: Nguyên vật liệu (42%), Nhân công (35%), Vận hành (23%)\n\n💡 *Tỉ suất lợi nhuận ${margin}% là khá tốt cho ngành F&B. Mục tiêu dài hạn nên hướng tới 35%.*`;
  }
  if (q.includes('tăng doanh thu') || q.includes('cuối tuần')) {
    return `🚀 **Chiến lược tăng doanh thu cuối tuần:**\n\n1. **Combo ưu đãi**: Tạo set meal cho 2-4 người với giá tiết kiệm 15%\n2. **Happy Hour**: Giảm 20% đồ uống từ 14:00-16:00\n3. **Đặt bàn trước**: Tặng món khai vị miễn phí khi đặt bàn trước 24 giờ\n4. **Loyalty points**: Tích điểm 2x vào thứ 7 CN\n5. **Social media**: Đăng hình ảnh hấp dẫn vào tối thứ 6 để kéo khách cuối tuần\n\n💡 *Áp dụng đồng thời 2-3 chiến lược trên có thể tăng doanh thu 18-25%.*`;
  }
  if (q.includes('khách hàng')) {
    return `👥 **Phân tích khách hàng:**\n\n• Khách thường xuyên (≥2 lần/tuần): 127 người\n• Khách mới tháng này: 89 người\n• Tỷ lệ quay lại: 68%\n• Thời điểm đông khách: 11:30-13:30 và 17:30-20:00\n\n**Top khách hàng VIP:**\n1. Nguyễn Văn An - 45 lần/tháng\n2. Trần Thị Bích - 38 lần/tháng\n3. Lê Minh Tú - 31 lần/tháng\n\n💡 *Gợi ý triển khai chương trình khách hàng thân thiết để giữ chân top 20% khách VIP.*`;
  }
  return `🤖 **AI Copilot ALN Restaurant**\n\nTôi đã phân tích dữ liệu nhà hàng của bạn. Hôm nay có **${revenueData[6].orders} đơn hàng** với tổng doanh thu **${formatCompactCurrency(revenueData[6].revenue)}**.\n\nBạn có thể hỏi tôi về:\n• Doanh thu và lợi nhuận\n• Tình trạng kho hàng\n• Hiệu suất sản phẩm\n• Gợi ý cải thiện kinh doanh\n\n💡 *Tôi phân tích dữ liệu thực tế của nhà hàng để đưa ra những insight chính xác nhất.*`;
};

export default function AICopilotScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'ai',
      content: `Xin chào! Tôi là **AI Copilot** của Nhà hàng ALN 🍜\n\nTôi đã phân tích toàn bộ dữ liệu kinh doanh của nhà hàng. Hôm nay doanh thu đạt **${formatCompactCurrency(revenueData[6].revenue)}** với **${revenueData[6].orders} đơn hàng**.\n\nBạn muốn biết điều gì?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: generateAIResponse(text),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1200);
  };

  const renderMessage = (msg: ChatMessage) => {
    const isUser = msg.role === 'user';
    const lines = msg.content.split('\n');

    return (
      <View key={msg.id} style={[styles.msgWrapper, isUser && styles.msgWrapperUser]}>
        {!isUser ? (
          <View style={styles.aiAvatar}>
            <Ionicons name="sparkles" size={14} color={Colors.ai} />
          </View>
        ) : null}
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAI]}>
          {lines.map((line, i) => {
            const bold = line.replace(/\*\*(.*?)\*\*/g, '$1');
            return (
              <Text
                key={i}
                style={[
                  styles.bubbleText,
                  isUser ? styles.bubbleTextUser : styles.bubbleTextAI,
                  line.startsWith('•') && styles.bulletText,
                  line.startsWith('#') && styles.headingText,
                ]}
              >
                {bold}
              </Text>
            );
          })}
          <Text style={[styles.msgTime, isUser && styles.msgTimeUser]}>
            {msg.timestamp.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn} activeOpacity={0.7}>
          <Ionicons name="close" size={22} color={Colors.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerIcon}>
            <Ionicons name="sparkles" size={18} color={Colors.ai} />
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Restaurant Copilot</Text>
            <View style={styles.onlineRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>Đang hoạt động</Text>
            </View>
          </View>
        </View>
        <View style={{ width: 36 }} />
      </View>

      {/* Insights row */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.insightsScroll}>
        <View style={styles.insightsRow}>
          {aiInsights.map((insight) => (
            <View key={insight.id} style={styles.insightCard}>
              <AIInsightCard
                title={insight.title}
                description={insight.description}
                icon={insight.icon as any}
                color={insight.color}
                compact
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Messages */}
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.messages}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map(renderMessage)}
        {isTyping ? (
          <View style={styles.msgWrapper}>
            <View style={styles.aiAvatar}>
              <Ionicons name="sparkles" size={14} color={Colors.ai} />
            </View>
            <View style={[styles.bubble, styles.bubbleAI, styles.typingBubble]}>
              <ActivityIndicator size="small" color={Colors.ai} />
              <Text style={styles.typingText}>AI đang phân tích...</Text>
            </View>
          </View>
        ) : null}

        {/* Suggested questions */}
        {messages.length < 3 ? (
          <View style={styles.suggestedWrapper}>
            <Text style={styles.suggestedTitle}>Gợi ý câu hỏi:</Text>
            <View style={styles.suggestedGrid}>
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => sendMessage(q)}
                  style={styles.suggestedBtn}
                  activeOpacity={0.7}
                >
                  <Text style={styles.suggestedText}>{q}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : null}

        <View style={{ height: 16 }} />
      </ScrollView>

      {/* Input */}
      <View style={[styles.inputArea, { paddingBottom: insets.bottom + 8 }]}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Hỏi AI về nhà hàng của bạn..."
          placeholderTextColor={Colors.gray400}
          multiline
          maxLength={500}
          returnKeyType="send"
          onSubmitEditing={() => sendMessage(input)}
        />
        <TouchableOpacity
          onPress={() => sendMessage(input)}
          style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
          disabled={!input.trim() || isTyping}
          activeOpacity={0.8}
        >
          <Ionicons name="send" size={18} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.white, paddingHorizontal: 16, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: Colors.border,
  },
  closeBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.gray100, alignItems: 'center', justifyContent: 'center',
  },
  headerCenter: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerIcon: {
    width: 38, height: 38, borderRadius: 12,
    backgroundColor: Colors.aiLight, alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 15, fontWeight: '700', color: Colors.text },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 1 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.success },
  onlineText: { fontSize: 11, color: Colors.success, fontWeight: '600' },
  insightsScroll: { maxHeight: 110, borderBottomWidth: 1, borderBottomColor: Colors.border },
  insightsRow: { flexDirection: 'row', gap: 10, padding: 12, paddingRight: 20 },
  insightCard: { width: 220 },
  messages: { padding: 16, gap: 12 },
  msgWrapper: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  msgWrapperUser: { flexDirection: 'row-reverse' },
  aiAvatar: {
    width: 30, height: 30, borderRadius: 10,
    backgroundColor: Colors.aiLight, alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  bubble: {
    maxWidth: '80%', borderRadius: 16, padding: 12, gap: 4,
  },
  bubbleAI: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 4,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1, shadowRadius: 4, elevation: 2,
  },
  bubbleUser: {
    backgroundColor: Colors.primary,
    borderTopRightRadius: 4,
  },
  bubbleText: { fontSize: 14, lineHeight: 20 },
  bubbleTextAI: { color: Colors.text },
  bubbleTextUser: { color: Colors.white },
  bulletText: { marginLeft: 4 },
  headingText: { fontWeight: '700', marginTop: 4 },
  msgTime: { fontSize: 10, color: Colors.gray400, alignSelf: 'flex-end', marginTop: 2 },
  msgTimeUser: { color: 'rgba(255,255,255,0.7)' },
  typingBubble: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  typingText: { fontSize: 13, color: Colors.textSecondary, fontStyle: 'italic' },
  suggestedWrapper: { marginTop: 8 },
  suggestedTitle: { fontSize: 12, fontWeight: '700', color: Colors.textSecondary, marginBottom: 8 },
  suggestedGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  suggestedBtn: {
    backgroundColor: Colors.white, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7,
    borderWidth: 1, borderColor: Colors.border,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1, shadowRadius: 2, elevation: 1,
  },
  suggestedText: { fontSize: 12, color: Colors.text, fontWeight: '500' },
  inputArea: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 10,
    backgroundColor: Colors.white, paddingHorizontal: 16, paddingTop: 10,
    borderTopWidth: 1, borderTopColor: Colors.border,
  },
  input: {
    flex: 1, backgroundColor: Colors.gray100, borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 10, fontSize: 15,
    color: Colors.text, maxHeight: 100,
  },
  sendBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: Colors.ai, alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: Colors.gray200 },
});
