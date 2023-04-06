#pragma once
#include <NativeModules.h>
#include <winrt/Windows.UI.Notifications.h>
#include <winrt/Windows.Data.Xml.Dom.h>

using namespace winrt::Windows::UI::Notifications;
using namespace winrt::Windows::Data::Xml::Dom;

REACT_MODULE(Notifications)
struct Notifications {

  REACT_INIT(Initialize);
  void Initialize(React::ReactContext const& context) noexcept {
    m_context = context;
  }

  REACT_METHOD(Raise, L"raise");
  void Raise(const std::string& textToShow) noexcept
  {
    auto xml = ToastNotificationManager::GetTemplateContent(ToastTemplateType::ToastText01);
    for (auto& element : xml.GetElementsByTagName(L"text")) {
      element.AppendChild(xml.CreateTextNode(winrt::to_hstring(textToShow)));
    }

    auto toast = ToastNotification(xml);
    ToastNotificationManager::CreateToastNotifier().Show(toast);
  }

private:
  React::ReactContext m_context;
};